import { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { BackButton } from "../../components/BackButton";
import Wizard, { WizardRef } from "react-native-wizard";
import { NextButton } from "../../components/NextButton";
import { Age } from "./Age";
import { Weight } from "./Weight";
import AppWrapper from "../../wrappers/AppWrapper";
import { Gender } from "./Gender";
import { Height } from "./Height";
import { Meals, WorkoutInput } from "./WorkoutInput";
export const HealthStepForm = ({ navigation }) => {
  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [weightSource, setWeightSource] = useState([]);
  const [heightSource, setHeightSource] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const dataWeight = Array.from({ length: 150 }, (_, i) => i + 1);
      const dataHeight = Array.from({ length: 150 }, (_, i) => i + 1);
      setHeightSource(dataHeight);
      setWeightSource(dataWeight);
    }

    fetchData();
  }, []);

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
      content: <Weight dataSource={weightSource} />,
    },
    {
      content: <Height dataSource={heightSource} />,
    },
    {
      content: <Gender />,
    },
    {
      content: <WorkoutInput />,
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
              nextStepAnimation="slideRight"
              prevStepAnimation="slideLeft"
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
