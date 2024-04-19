import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import AndroidWrapper from "../wrappers/AndroidWrapper";
import SocialConnect from "../components/SocialConnect";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <AndroidWrapper>
      <SafeAreaView style={loginStyles.container}>
        <View style={loginStyles.title}>
          <Text className="text-4xl font-bold">Hello,</Text>
          <Text className="text-2xl">Welcome back!</Text>
        </View>
        <View className="flex-auto justify-between">
          <View className="flex justify-between">
            <View className="mt-8">
              <Text style={loginStyles.label}>Email</Text>
              <TextInput
                style={loginStyles.input}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            </View>
            <View className="mt-8 ">
              <Text style={loginStyles.label}>Enter Password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  style={loginStyles.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="Enter Password"
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  textContentType="password"
                  autoCorrect={false}
                />
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#aaa"
                  style={loginStyles.eyeIcon}
                  onPress={toggleShowPassword}
                />
              </View>
            </View>
            <TouchableOpacity className="my-6 ml-1">
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
      </SafeAreaView>
    </AndroidWrapper>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    padding: 30,
    marginTop: 50,
    marginBottom: 30,
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
  },
});

export default Login;
