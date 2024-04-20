import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import AndroidWrapper from "../wrappers/AndroidWrapper";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Register = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSwipeLeft = () => {
    navigation.goBack();
  };

  return (
    <AndroidWrapper>
      {console.log(password)}
      <View style={register.container}>
        <View style={register.title}>
          <Text className="text-2xl font-bold">Create an account</Text>
          <Text className="text-sm">
            Let's help you set up your account,{"\n"}it won't take long.
          </Text>
        </View>
        <View className="flex-auto justify-between">
          <View className="flex justify-between">
            <View className="mt-4">
              <Text style={register.label}>Name</Text>
              <TextInput
                style={register.input}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="Enter name"
              />
            </View>
            <View className="mt-4">
              <Text style={register.label}>Email</Text>
              <TextInput
                style={register.input}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            </View>
            <View className="mt-4">
              <Text style={register.label}>Enter Password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  clearTextOnFocus={false}
                  style={register.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="Enter Password"
                  secureTextEntry={!showPassword.password}
                  textContentType="none"
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <MaterialCommunityIcons
                  name={showPassword.password ? "eye" : "eye-off"}
                  size={24}
                  color="#aaa"
                  style={register.eyeIcon}
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                />
              </View>
            </View>
            <View className="mt-4">
              <Text style={register.label}>Confirm Password</Text>
              <View className="flex-row items-center relative">
                <TextInput
                  clearTextOnFocus={false}
                  style={register.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="Enter Password"
                  secureTextEntry={!showPassword.confirmPassword}
                  textContentType="none"
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <MaterialCommunityIcons
                  name={showPassword.confirmPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#aaa"
                  style={register.eyeIcon}
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                />
              </View>
            </View>
            <View className="my-4 flex flex-row items-center">
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                className="rounded-md ml-1"
              />
              <TouchableOpacity className="ml-1">
                <Text className="text-orangeText">Accept term & Condition</Text>
              </TouchableOpacity>
            </View>
            <CustomButton title="Sign Up" width={"100%"} height={62} />
            {/* <SocialConnect /> */}
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
      </View>
    </AndroidWrapper>
  );
};

const register = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 30,
    alignItems: "flex-start",
  },
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
  },
});
export default Register;
