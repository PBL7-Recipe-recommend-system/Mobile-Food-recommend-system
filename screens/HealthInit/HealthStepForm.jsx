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
import { Height } from "./Height";
import { Gender } from "./Gender";
import { WorkoutInput } from "./WorkoutInput";
import { MealsInput } from "./MealsInput";
import { Goal } from "./Goal";
import { CompleteSetUp } from "./CompleteSetUp";
import AppWrapper from "../../wrappers/AppWrapper";
import { getUserIdFromToken } from "../../utils/token";
import { setUpPersonalize } from "../../api/users";
import { HomeNavigation } from "../../navigation/HomeNavigation";

export const HealthStepForm = ({ navigation }) => {
  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    birthday: null,
    weight: null,
    height: null,
    gender: null,
    dailyActivities: null,
    meals: null,
    dietaryGoal: null,
    ingredients: [],
  });

  const stepList = [
    {
      content: (
        <Age updateValue={(value) => updateFormValue("birthday", value)} />
      ),
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
          updateValue={(value) => updateFormValue("dailyActivities", value)}
          defaultValue={formValues.dailyActivities}
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
        <Goal
          updateValue={(value) => updateFormValue("dietaryGoal", value)}
          defaultValue={formValues.dietaryGoal}
        />
      ),
    },

    {
      content: <CompleteSetUp />,
    },
  ];

  const updateFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const onNextStep = () => {
    if (isLastStep) {
      navigation.navigate("HomeNavigation");
    }
    wizard.current.next();
  };

  const onPrevStep = () => {
    if (currentStep === 0) {
      navigation.navigate("Login");
    }
    wizard.current.prev();
  };

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
        return formValues.dailyActivities === null;
      case 5:
        return formValues.meals === null;
      case 6:
        return formValues.dietaryGoal === null;
      default:
        return false;
    }
  };

  const handleCompleteSetUp = async () => {
    const res = await setUpPersonalize(formValues);
    console.log(res);
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
          handleCompleteSetUp={handleCompleteSetUp}
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
