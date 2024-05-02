import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CheckBox from "expo-checkbox";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import global from "../../Styles";
import ErrorText from "../../components/ErrorText";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import { useTogglePasswordVisibility } from "../../hook/useTogglePasswordVisibility";
import AppWrapper from "../../wrappers/AppWrapper";
import { authenticate, registerAPI } from "../../api/auth";
import { showErrorToast } from "../../helper/errorToast";
import { HealthStepForm } from "../healthInit/HealthStepForm";
import {
  ErrorEmailMessage,
  ErrorNameMessage,
  ErrorPasswordMessage,
} from "../../constants/messages";
const Register = () => {
  const navigation = useNavigation();
  const [isValidData, setIsValidData] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const handleChangeEmail = (text) => {
    setDataForm({
      ...dataForm,
      email: text,
    });
    setIsValidData({ ...isValidData, email: validateEmail(text) });
  };
  const handleChangePassword = (text) => {
    setDataForm({
      ...dataForm,
      password: text,
    });
    setIsValidData({ ...isValidData, password: validatePassword(text) });
  };

  const handleChangeConfirmPassword = (text) => {
    setDataForm({
      ...dataForm,
      confirmPassword: text,
    });
    setIsValidData({
      ...isValidData,
      confirmPassword: validateConfirmPassword(dataForm.password, text),
    });
  };
  const handleSubmitForm = async () => {
    setIsValidData((prevData) => ({
      ...prevData,
      name: dataForm.name !== "",
      email: dataForm.email !== "",
      password: dataForm.password !== "",
      confirmPassword:
        dataForm.confirmPassword !== "" &&
        dataForm.password === dataForm.confirmPassword,
    }));
    const allFieldsValid = Object.values(isValidData).every(
      (value) => value === true
    );

    if (allFieldsValid) {
      const res = await registerAPI(dataForm);
      showErrorToast(res.message);
      if (res.status === 401) {
      } else {
        navigation.navigate("HealthStepForm");
      }
    }
  };

  return (
    <AppWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={global.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={register.title}>
              <Text className="text-3xl font-bold">Create an account</Text>
              <Text className="text-sm">
                Let's help you set up your account,{"\n"}it won't take long.
              </Text>
            </View>

            <View className="flex-auto justify-between">
              <View className="flex justify-between">
                <View className="mt-4">
                  <Text style={register.label}>Name</Text>
                  <TextInput
                    style={isValidData.name ? global.input : global.errorInput}
                    placeholder="Enter name"
                    onChangeText={(text) => {
                      if (text === "") {
                        setIsValidData({ ...isValidData, name: false });
                      } else {
                        setIsValidData({ ...isValidData, name: true });
                      }
                      setDataForm({ ...dataForm, name: text });
                    }}
                  />
                  <ErrorText
                    isValid={isValidData.name}
                    message={ErrorNameMessage}
                  />
                </View>
                <View className="mt-1">
                  <Text style={register.label}>Email</Text>
                  <TextInput
                    style={isValidData.email ? global.input : global.errorInput}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    onChangeText={handleChangeEmail}
                  />
                  <ErrorText
                    isValid={isValidData.email}
                    message={ErrorEmailMessage}
                  />
                </View>
                <View className="mt-1">
                  <Text style={register.label}>Password</Text>
                  <View className="flex-row items-center relative">
                    <TextInput
                      clearTextOnFocus={false}
                      style={
                        isValidData.password ? global.input : global.errorInput
                      }
                      textContentType="newPassword"
                      placeholder="Enter password"
                      secureTextEntry={passwordVisibility}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={handleChangePassword}
                    />
                    <TouchableOpacity
                      style={register.eyeIcon}
                      onPress={handlePasswordVisibility}
                    >
                      <MaterialCommunityIcons
                        name={rightIcon}
                        size={24}
                        color={isValidData.password ? "#aaa" : "red"}
                      />
                    </TouchableOpacity>
                  </View>
                  <ErrorText
                    isValid={isValidData.password}
                    message={ErrorPasswordMessage}
                  />
                </View>
                <View className="mt-1">
                  <Text style={register.label}>Confirm Password</Text>
                  <View className="flex-row items-center relative">
                    <TextInput
                      clearTextOnFocus={false}
                      style={
                        isValidData.confirmPassword
                          ? global.input
                          : global.errorInput
                      }
                      placeholder="Confirm password"
                      secureTextEntry={passwordVisibility}
                      textContentType="none"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={handleChangeConfirmPassword}
                    />
                    <TouchableOpacity
                      style={register.eyeIcon}
                      onPress={handlePasswordVisibility}
                    >
                      <MaterialCommunityIcons
                        name={rightIcon}
                        size={24}
                        color={isValidData.confirmPassword ? "#aaa" : "red"}
                      />
                    </TouchableOpacity>
                  </View>
                  <ErrorText
                    isValid={isValidData.confirmPassword}
                    message={
                      "Password confirmation does not match the entered password."
                    }
                  />
                </View>
                {/* <View className="mb-4 mt-2 flex flex-row items-center">
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    className="rounded-md ml-1"
                  />
                  <TouchableOpacity className="ml-1">
                    <Text className="text-orangeText">
                      Accept term & Condition
                    </Text>
                  </TouchableOpacity>
                </View> */}
                <CustomButton
                  title="Sign Up"
                  width={"100%"}
                  height={62}
                  onPressButton={handleSubmitForm}
                />
              </View>
              <View className="flex flex-row text-center items-center justify-center mt-2">
                <Text>Already a member?</Text>
                <TouchableOpacity
                  className="ml-1"
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text className="text-orangeText">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </AppWrapper>
  );
};

const register = StyleSheet.create({
  input: {
    minWidth: "100%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9D9D9",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    transform: [{ translateY: 2 }],
  },
});
export default Register;
