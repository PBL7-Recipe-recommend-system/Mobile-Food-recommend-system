import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import global from "../../Styles";
import { authenticate } from "../../api/auth";
import { getRecommendation } from "../../api/recommendation";
import { me } from "../../api/users";
import CustomButton from "../../components/CustomButton";
import ErrorText from "../../components/ErrorText";
import { Loading } from "../../components/Loading";
import {
  ErrorEmailMessage,
  ErrorPasswordMessage,
} from "../../constants/messages";
import { showErrorToast } from "../../helper/errorToast";
import { useTogglePasswordVisibility } from "../../hook/useTogglePasswordVisibility";
import {
  validateEmail,
  validateLoginForm,
  validatePassword,
} from "../../utils/validation";
import AppWrapper from "../../wrappers/AppWrapper";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("userrr1@gmail.com");
  const [password, setPassword] = useState("Tai2211@");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  useEffect(() => {
    const resetForm = async () => {
      setIsValidEmail(true);
      setIsValidPassword(true);
    };
    resetForm();
  }, []);
  const handleChangeEmail = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };
  const handleChangePassword = (text) => {
    setPassword(text);
    setIsValidPassword(validatePassword(text));
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleSubmitForm = async () => {
    if (email === "") setIsValidEmail(false);
    if (password === "") setIsValidPassword(false);
    if (validateLoginForm(email, password)) {
      setLoading(true);
      try {
        const res = await authenticate(email, password);
        if (res.status !== 200) {
          showErrorToast(res.message);
        } else {
          const res = await me();
          const user = res.data;
          if (user.bmi === 0) {
            navigation.navigate("HealthStepForm");
          } else {
            navigation.navigate("HomeNavigation");
            await getRecommendation();
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    } else {
    }
  };

  return (
    <AppWrapper>
      <Loading loading={loading} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={global.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={loginStyles.title}>
              <Text className="text-4xl font-bold">Hello,</Text>
              <Text className="text-2xl">Welcome back!</Text>
            </View>
            <View className="flex-auto justify-between">
              <View className="flex justify-between">
                <View className="my-1">
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
                    message={ErrorEmailMessage}
                  />
                </View>
                <View className="my-2">
                  <Text style={loginStyles.label}>Password</Text>
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
                    message={ErrorPasswordMessage}
                  />
                </View>
                <TouchableOpacity
                  className="my-3 mx-1"
                  onPress={handleForgotPassword}
                >
                  <Text className="text-orangeText font-medium ">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <CustomButton
                  title="Sign In"
                  width={"100%"}
                  height={62}
                  onPressButton={handleSubmitForm}
                  disabled={
                    !isValidEmail ||
                    !isValidPassword ||
                    email === "" ||
                    password === ""
                  }
                />
                {/* <SocialConnect /> */}
              </View>

              <View className="flex flex-row text-center items-center justify-center">
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  className="ml-1 my-4"
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text className="text-orangeText">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </AppWrapper>
  );
};

const loginStyles = StyleSheet.create({
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
