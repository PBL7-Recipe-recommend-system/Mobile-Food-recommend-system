import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import AppWrapper from "../../wrappers/AppWrapper";
import { BackButton } from "../../components/BackButton";
import { useTogglePasswordVisibility } from "../../hook/useTogglePasswordVisibility";
import { useState } from "react";
import global from "../../Styles";
import ErrorText from "../../components/ErrorText";
import {
  ErrorConfirmPasswordMessage,
  ErrorPasswordMessage,
} from "../../constants/messages";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../utils/validation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { changePassword } from "../../api/users";
import { showErrorToast } from "../../helper/errorToast";
import { useNavigation } from "@react-navigation/native";
import Profile from "./Profile";

const PASSWORD = 1;
const NEW_PASSWORD = 2;
const CONFIRM_PASSWORD = 3;

export const ChangePassword = () => {
  const navigation = useNavigation();
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const handleChangePassword = (text, type) => {
    const newPassword = watch("newPassword");
    if (type === PASSWORD) {
      setIsValidPassword(validatePassword(text));
    } else if (type === NEW_PASSWORD) {
      setIsValidNewPassword(validatePassword(text));
    } else if (type === CONFIRM_PASSWORD) {
      setIsValidConfirmPassword(validateConfirmPassword(text, newPassword));
    }
  };
  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data);
      if (res.status !== 200) {
        showErrorToast(res.message);
        reset();
      } else {
        navigation.push("Profile");
      }
    } catch (error) {}
  };
  return (
    <AppWrapper>
      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        <View style={styles.header}>
          <View style={styles.backButton}>
            <BackButton />
          </View>
          <Text style={styles.textHeader}>Change Password</Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.textLabel}>Current Password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  placeholder="Your current password"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    handleChangePassword(text, PASSWORD);
                  }}
                  value={value}
                  clearTextOnFocus={false}
                  style={isValidPassword ? global.input : global.errorInput}
                  textContentType="newPassword"
                  secureTextEntry={passwordVisibility}
                  autoCorrect={false}
                  autoCapitalize="none"
                  enablesReturnKeyAutomatically
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={handlePasswordVisibility}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={24}
                    color={isValidPassword ? "#aaa" : "red"}
                  />
                </TouchableOpacity>
              </View>
              {isValidPassword === false && (
                <ErrorText
                  isValid={isValidPassword}
                  message={ErrorPasswordMessage}
                />
              )}
            </View>
          )}
          name="currentPassword"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.textLabel}>New Password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  placeholder="Your new password"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    handleChangePassword(text, NEW_PASSWORD);
                  }}
                  value={value}
                  clearTextOnFocus={false}
                  style={isValidNewPassword ? global.input : global.errorInput}
                  textContentType="newPassword"
                  secureTextEntry={passwordVisibility}
                  autoCorrect={false}
                  autoCapitalize="none"
                  enablesReturnKeyAutomatically
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={handlePasswordVisibility}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={24}
                    color={isValidNewPassword ? "#aaa" : "red"}
                  />
                </TouchableOpacity>
              </View>
              {isValidNewPassword === false && (
                <ErrorText
                  isValid={isValidNewPassword}
                  message={ErrorPasswordMessage}
                />
              )}
            </View>
          )}
          name="newPassword"
        />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.textLabel}>Confirm password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  placeholder="Confirm password"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    handleChangePassword(text, CONFIRM_PASSWORD);
                  }}
                  value={value}
                  clearTextOnFocus={false}
                  style={
                    isValidConfirmPassword ? global.input : global.errorInput
                  }
                  textContentType="newPassword"
                  secureTextEntry={passwordVisibility}
                  autoCorrect={false}
                  autoCapitalize="none"
                  enablesReturnKeyAutomatically
                />

                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={handlePasswordVisibility}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={24}
                    color={isValidConfirmPassword ? "#aaa" : "red"}
                  />
                </TouchableOpacity>
              </View>
              {isValidConfirmPassword === false && (
                <ErrorText
                  isValid={isValidConfirmPassword}
                  message={ErrorConfirmPasswordMessage}
                />
              )}
            </View>
          )}
          name="confirmPassword"
        />
        <CustomButton
          title={"Update"}
          width={"50%"}
          customStyle={{
            paddingVertical: 10,
            marginHorizontal: "auto",
            marginVertical: 20,
          }}
          onPressButton={handleSubmit(onSubmit)}
        />
      </View>
    </AppWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  textLabel: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 4,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    transform: [{ translateY: 3 }],
  },
});
