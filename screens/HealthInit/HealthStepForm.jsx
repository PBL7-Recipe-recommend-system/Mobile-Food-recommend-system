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
import { WorkoutInput } from "./WorkoutInput";
import { Meals, MealsInput } from "./MealsInput";
import { Goal } from "./Goal";
import { CompleteSetUp } from "./CompleteSetUp";
export const HealthStepForm = ({ navigation }) => {
  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    age: null,
    weight: null,
    height: null,
    gender: null,
    workout: null,
    meals: null,
  });
  const updateFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

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
      content: <Age updateValue={(value) => updateFormValue("age", value)} />,
    },
    {
      content: (
        <Weight updateValue={(value) => updateFormValue("weight", value)} />
      ),
    },
    {
      content: (
        <Height updateValue={(value) => updateFormValue("height", value)} />
      ),
    },
    {
      content: (
        <Gender
          updateValue={(value) => updateFormValue("gender", value)}
          defaultValue={formValues.gender}
        />
      ),
    },
    {
      content: (
        <WorkoutInput
          updateValue={(value) => updateFormValue("workout", value)}
          defaultValue={formValues.workout}
        />
      ),
    },
    {
      content: (
        <MealsInput
          updateValue={(value) => updateFormValue("meals", value)}
          defaultValue={formValues.meals}
        />
      ),
    },
    {
      content: (
        <Goal updateValue={(value) => updateFormValue("meals", value)} />
      ),
    },

    {
      content: <CompleteSetUp />,
    },
  ];
  const isNextButtonDisabled = () => {
    switch (currentStep) {
      case 0:
        return formValues.age === null;
      case 1:
        return formValues.weight === null;
      case 2:
        return formValues.height === null;
      case 3:
        return formValues.gender === null;
      case 4:
        return formValues.workout === null;
      case 5:
        return formValues.meals === null;
      default:
        return false;
    }
  };
  return (
    <AppWrapper>
      <View className="ml-[30px] text-center mt-3">
        <BackButton navigation={navigation} onPress={onPrevStep} />
      </View>
      <View style={styles.container}>
        <Wizard
          ref={wizard}
          activeStep={0}
          steps={stepList}
          isFirstStep={(val) => setIsFirstStep(val)}
          isLastStep={(val) => setIsLastStep(val)}
          // onNext={() => {
          //   console.log("Next Step Called");
          // }}
          // onPrev={() => {
          //   console.log("Previous Step Called");
          // }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            if (isLastStep) {
              setTimeout(() => {
                console.log("Last Step timeout");
              }, 2000);
            }
            setCurrentStep(currentStep);
          }}
          nextStepAnimation="slideRight"
          prevStepAnimation="slideLeft"
        />
      </View>

      <View>
        <NextButton
          percentage={((currentStep + 1) * 100) / stepList.length}
          onPress={onNextStep}
          navigation={navigation}
          disabled={isNextButtonDisabled()}
        />
      </View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },

  iosScrollPicker: {
    alignItems: "center",
  },
});
