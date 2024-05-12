import React, { useState } from "react";
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
import { sendOTP } from "../../api/auth";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import ErrorText from "../../components/ErrorText";
import { PRIMARY_COLOR } from "../../constants/color";
import {
  ErrorAccountNotFoundMessage,
  ErrorEmailMessage,
} from "../../constants/messages";
import { validateEmail } from "../../utils/validation";
import AppWrapper from "../../wrappers/AppWrapper";

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState(ErrorEmailMessage);
  const [loading, setLoading] = useState(false);
  const handleChangeEmail = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      const res = await sendOTP(email);
      if (res.status === 200) {
        navigation.navigate("OPTInput");
      } else if (res.status === 401) {
        setIsValidEmail(false);
        setErrorMessage(ErrorAccountNotFoundMessage);
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppWrapper>
      <Spinner
        visible={loading}
        textStyle={{ color: "#000" }}
        color={PRIMARY_COLOR}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={global.container}>
          <BackButton navigation={navigation} />
          <View className="my-8">
            <Text className="text-3xl font-bold">Forgot Password</Text>
            <Text className="my-4 text-[16px]">
              Please enter your email to reset the password
            </Text>
          </View>
          <View className="my-6">
            <Text style={style.label}>Email</Text>
            <TextInput
              style={isValidEmail ? global.input : global.errorInput}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder="Enter email"
              keyboardType="email-address"
              onChangeText={handleChangeEmail}
            />
            <ErrorText isValid={isValidEmail} message={errorMessage} />
          </View>
          <CustomButton
            title="Send Code"
            width={"100%"}
            height={62}
            onPressButton={handleSubmitForm}
            disabled={!isValidEmail || email === ""}
          />
          <View style={style.accountText} className="">
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              className="ml-1 my-4"
              onPress={() => navigation.navigate("Register")}
            >
              <Text className="text-orangeText">Sign Up</Text>
            </TouchableOpacity>
          </View>
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
});
