import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import global from "../../Styles";
import { sendOTP, verifyOTP } from "../../api/auth";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import { Loading } from "../../components/Loading";
import { showErrorToast } from "../../helper/errorToast";
import AppWrapper from "../../wrappers/AppWrapper";

const OPTInput = ({ navigation }) => {
  let otpInput = useRef(null);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(3 * 60);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("emailReset");
      setEmail(email);
    };
    getEmail();
  }, []);

  const handleSubmitForm = async () => {
    setLoading(true);
    console.log(value);
    try {
      const res = await verifyOTP(email, { otp: value });
      if (res.status === 200) {
        navigation.navigate("ResetPassword");
      } else {
        showErrorToast(res.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);
    try {
      await sendOTP(email);
    } catch (error) {
    } finally {
      setLoading(false);
      otpInput.current.clear();
      setCountdown(3 * 60);
    }
  };
  return (
    <AppWrapper>
      <Loading loading={loading} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[global.container, style.customContainer]}>
          <View>
            <BackButton />
            <View className="my-8">
              <Text className="text-3xl font-bold">
                Please Check Your Email
              </Text>
              <View style={{ marginVertical: 8 }}>
                <Text style={{ fontSize: 16 }}>We have sent the code to </Text>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {email}
                </Text>
              </View>
            </View>
          </View>
          <View className="text-center flex-col items-center justify-center">
            <OtpInput
              ref={otpInput}
              numberOfDigits={6}
              focusColor="green"
              focusStickBlinkingDuration={100}
              onTextChange={(text) => setValue(text)}
              onFilled={(text) => setValue(text)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={
                {
                  //   containerStyle: styles.container,
                  //   pinCodeContainerStyle: styles.pinCodeContainer,
                  //   pinCodeTextStyle: styles.pinCodeText,
                  //   focusStickStyle: styles.focusStick,
                  //   focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }
              }
            />
            <Text className="text-center my-3 font-bold text-sm">
              {countdown > 0 ? (
                `Send code again in ${minutes}:${
                  seconds < 10 ? `0${seconds}` : seconds
                }`
              ) : (
                <TouchableOpacity onPress={resendCode}>
                  <Text className="font-bold">Resend code</Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
          <CustomButton
            title="Verification"
            width={"100%"}
            height={62}
            onPressButton={handleSubmitForm}
            disabled={value.length < 6}
          />
        </View>
      </TouchableWithoutFeedback>
    </AppWrapper>
  );
};
const style = StyleSheet.create({
  customContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    flex: 1,
  },
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
export default OPTInput;
