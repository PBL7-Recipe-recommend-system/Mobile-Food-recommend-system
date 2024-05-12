import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import global from "../../Styles";
import { updateNewPassword } from "../../api/auth";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import ErrorText from "../../components/ErrorText";
import { PRIMARY_COLOR } from "../../constants/color";
import { ErrorPasswordMessage, LoadingMessage } from "../../constants/messages";
import { showErrorToast } from "../../helper/errorToast";
import { useTogglePasswordVisibility } from "../../hook/useTogglePasswordVisibility";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../utils/validation";
import AppWrapper from "../../wrappers/AppWrapper";

export const ResetPassword = ({ navigation }) => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("emailReset");
      setEmail(email);
    };
    getEmail();
  }, []);
  const handleChangePassword = (text) => {
    setPassword(text);
    setIsValidPassword(validatePassword(text));
  };

  const handleChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
    setIsValidConfirmPassword(validateConfirmPassword(password, text));
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      const res = await updateNewPassword(email, { newPassword: password });
      console.log(res);
      if (res.status === 200) {
        navigation.navigate("HomeNavigation");
      } else {
        showErrorToast(res.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppWrapper>
      <Spinner
        visible={loading}
        textContent={LoadingMessage}
        textStyle={{ color: "#000" }}
        color={PRIMARY_COLOR}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={global.container}>
          <BackButton navigation={navigation} />
          <View className="my-8">
            <Text className="text-3xl font-bold">Reset Password</Text>
            <Text className="my-4 text-[16px]">
              Please enter your new password
            </Text>
          </View>
          <View className="my-2">
            <Text style={style.label}>Password</Text>
            <View className="flex-row items-center relative">
              <TextInput
                clearTextOnFocus={false}
                style={isValidPassword ? global.input : global.errorInput}
                onChangeText={handleChangePassword}
                textContentType="newPassword"
                placeholder="Enter password"
                secureTextEntry={passwordVisibility}
                autoCorrect={false}
                autoCapitalize="none"
                enablesReturnKeyAutomatically
              />
              <TouchableOpacity
                style={style.eyeIcon}
                onPress={handlePasswordVisibility}
              >
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={24}
                  color={isValidPassword ? "#aaa" : "red"}
                />
              </TouchableOpacity>
            </View>
            <ErrorText
              isValid={isValidPassword}
              message={ErrorPasswordMessage}
            />
          </View>
          <View className="mt-1">
            <Text style={style.label}>Confirm Password</Text>
            <View className="flex-row items-center relative">
              <TextInput
                clearTextOnFocus={false}
                style={
                  isValidConfirmPassword ? global.input : global.errorInput
                }
                placeholder="Confirm password"
                secureTextEntry={passwordVisibility}
                textContentType="none"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={handleChangeConfirmPassword}
              />
              <TouchableOpacity
                style={style.eyeIcon}
                onPress={handlePasswordVisibility}
              >
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={24}
                  color={isValidConfirmPassword ? "#aaa" : "red"}
                />
              </TouchableOpacity>
            </View>
            <ErrorText
              isValid={isValidConfirmPassword}
              message={
                "Password confirmation does not match the entered password."
              }
            />
          </View>
          <CustomButton
            title="Save"
            width={"100%"}
            height={62}
            onPressButton={handleSubmitForm}
            disabled={
              !isValidPassword ||
              !isValidConfirmPassword ||
              password === "" ||
              confirmPassword === ""
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  accountText: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    transform: [{ translateY: 3 }],
  },
});
