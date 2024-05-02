import React from "react";
import AppWrapper from "../../wrappers/AppWrapper";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import global from "../../Styles";
import { BackButton } from "../../components/BackButton";
import { useState } from "react";
import ErrorText from "../../components/ErrorText";
import {
  ErrorEmailMessage,
  ErrorPasswordMessage,
} from "../../constants/messages";
import CustomButton from "../../components/CustomButton";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../utils/validation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../../hook/useTogglePasswordVisibility";

export const ResetPassword = ({ navigation }) => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const handleChangePassword = (text) => {
    setPassword(text);
    setIsValidPassword(validatePassword(text));
  };

  const handleChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
    setIsValidConfirmPassword(validateConfirmPassword(password, text));
  };

  const handleSubmitForm = () => {};
  return (
    <AppWrapper>
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
