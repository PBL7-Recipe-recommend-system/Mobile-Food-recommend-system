import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import AndroidWrapper from "../wrappers/AndroidWrapper";
import SocialConnect from "../components/SocialConnect";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hook/useTogglePasswordVisibility";
import global from "../Styles";
import ErrorText from "../components/ErrorText";
const Login = ({ navigation }) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const validatePassword = (password) => {
    if (password === "") return true;
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    if (email === "") return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChangeEmail = (text) => {
    setIsValidEmail(validateEmail(text));
  };
  const handleChangePassword = (text) => {
    setIsValidPassword(validatePassword(text));
  };

  return (
    <AndroidWrapper>
      <View style={loginStyles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={24} color="#129575" />
        </TouchableOpacity>
        <View style={loginStyles.title}>
          <Text className="text-4xl font-bold">Hello,</Text>
          <Text className="text-2xl">Welcome back!</Text>
        </View>
        <View className="flex-auto justify-between">
          <View className="flex justify-between">
            <View className="mt-8">
              <Text style={loginStyles.label}>Email</Text>
              <TextInput
                style={isValidEmail ? global.input : global.errorInput}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="Enter email"
                keyboardType="email-address"
                onChangeText={handleChangeEmail}
              />
              <ErrorText
                isValid={isValidEmail}
                message={"Please enter a valid email address"}
              />
            </View>
            <View className="mt-3">
              <Text style={loginStyles.label}>Enter Password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  clearTextOnFocus={false}
                  style={isValidPassword ? global.input : global.errorInput}
                  onChangeText={handleChangePassword}
                  textContentType="newPassword"
                  placeholder="Enter Password"
                  secureTextEntry={passwordVisibility}
                  autoCorrect={false}
                  autoCapitalize="none"
                  enablesReturnKeyAutomatically
                />
                <TouchableOpacity
                  style={loginStyles.eyeIcon}
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
                message={"Please enter a valid password"}
              />
            </View>
            <TouchableOpacity className="my-3 ml-1">
              <Text className="text-orangeText font-medium ">
                Forgot password?
              </Text>
            </TouchableOpacity>
            <CustomButton title="Sign In" width={"100%"} height={62} />

            <SocialConnect />
          </View>

          <View className="flex flex-row text-center items-center justify-center">
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              className="ml-1"
              onPress={() => navigation.navigate("Register")}
            >
              <Text className="text-orangeText">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AndroidWrapper>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 30,
    alignItems: "flex-start",
  },
  title: {
    marginVertical: 30,
  },
  input: {
    minWidth: "100%",
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9D9D9",
  },
  errorInput: {
    minWidth: "100%",
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 11,
    color: "#D9D9D9",
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  iconContainer: {
    height: 44,
    width: 44,
    borderColor: "#fff",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    transform: [{ translateY: 3 }],
  },
});

export default Login;
