import React, { useRef, useState } from "react";
import AndroidWrapper from "../../wrappers/AppWrapper";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import global from "../../Styles";
import { BackButton } from "../../components/BackButton";
import Wizard, { WizardRef } from "react-native-wizard";
import { NextButton } from "../../components/NextButton";
import { Age } from "./Age";
import { Weight } from "./Weight";
import { Birthday, Height } from "./Height";
import AppWrapper from "../../wrappers/AppWrapper";
import { Gender } from "./Gender";
export const HealthStepForm = ({ navigation }) => {
  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const onNextStep = () => {
    wizard.current.next();
  };

  const onPrevStep = () => {
    if (currentStep === 0) {
      navigation.navigate("Login");
    }
    wizard.current.prev();
  };
  const stepList = [
    {
      content: <Age />,
    },
    {
      content: <Weight />,
    },
    {
      content: <Height />,
    },
    {
      content: <Gender />,
    },
  ];
  return (
    <AppWrapper>
      <ScrollView>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View className="pt-[30px] ml-[30px] text-center">
            <BackButton navigation={navigation} onPress={onPrevStep} />
          </View>
          <View
            style={
              Platform.OS === "ios"
                ? styles.iosScrollPicker
                : {
                    alignItems: "center",
                    marginBottom: 180,
                  }
            }
          >
            <Wizard
              ref={wizard}
              activeStep={0}
              steps={stepList}
              // isFirstStep={(val) => setIsFirstStep(val)}
              // isLastStep={(val) => setIsLastStep(val)}
              // onNext={() => {
              //   console.log("Next Step Called");
              // }}
              // onPrev={() => {
              //   console.log("Previous Step Called");
              // }}
              currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                setCurrentStep(currentStep);
              }}
            />
          </View>
        </SafeAreaView>

        <NextButton
          percentage={currentStep * 10}
          onPress={onNextStep}
          navigation={navigation}
        />
      </ScrollView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 30,
    alignItems: "flex-start",
  },
  iosScrollPicker: {
    alignItems: "center",
    marginBottom: 200,
  },
});
