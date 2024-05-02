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
import { validateEmail } from "../../utils/validation";
import ErrorText from "../../components/ErrorText";
import { ErrorEmailMessage } from "../../constants/messages";
import CustomButton from "../../components/CustomButton";
export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleChangeEmail = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const handleSubmitForm = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <AppWrapper>
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
            <ErrorText isValid={isValidEmail} message={ErrorEmailMessage} />
          </View>
          <CustomButton
            title="Send Email"
            width={"100%"}
            height={62}
            onPressButton={handleSubmitForm}
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
