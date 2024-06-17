import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import { MORNING_SNACK } from "../../utils/meals";
import CustomButton from "../CustomButton";
import { setCookedRecipe } from "../../api/recipes";
import { useNavigation } from "@react-navigation/native";
import { isToday, toCamelCase, isTodayString } from "../../utils/formatData";
import { Loading } from "../Loading";
import { getDateAddingFromStorage } from "../../utils/asyncStorageUtils";
import { showErrorToast } from "../../helper/errorToast";

export const StepContentSheet = ({ data, setIsCooking, baseServing, meal }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const stepList = data?.recipeInstructions || [];
  const numberStep = stepList.length;
  const [selectedDate, setSelectedDate] = useState("");

  const handleChangeStep = (step) => {
    setStep(step);
  };

  const handleNextStep = async () => {
    if (step === numberStep) {
      const date = await getDateAddingFromStorage();
      setSelectedDate(date);
      if (!isTodayString(date)) {
        showErrorToast("You can only cook for today!");
      } else {
        const param = {
          recipeId: data.recipeId,
          servingSize: baseServing || data.recipeServings,
          meal: toCamelCase(meal),
        };
        try {
          setLoading(true);
          await setCookedRecipe(param);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
      navigation.goBack();
    } else {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step === 1) setIsCooking(false);
    setStep(step - 1);
  };
  return (
    <View style={style.container}>
      <Loading loading={loading} />
      <View>
        <Text style={style.title}>Step {step}</Text>
        <View style={style.stepButtonContainer}>
          {Array.from({ length: numberStep }, (_, index) => (
            <TouchableOpacity
              key={index}
              style={[style.stepButton, step === index + 1 && style.activeStep]}
              onPress={() => handleChangeStep(index + 1)}
            >
              <Text
                className="text-center"
                style={step === index + 1 && { color: "#fff" }}
              >
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView contentContainerStyle={style.contentContainer}>
        <Text className="text-[16px]">{stepList[step - 1]}</Text>
      </ScrollView>
      <View
        className="items-center"
        style={{
          justifyContent: "space-around",
          height: "28%",
          flexDirection: "row",
          marginTop: 16,
        }}
      >
        <CustomButton
          title="Previous"
          width={"40%"}
          height={"40%"}
          onPressButton={handlePreviousStep}
          customStyle={{
            backgroundColor: "#F2F2F2",
          }}
          textColor={"#000000"}
        />

        <CustomButton
          title={step === numberStep ? "Finish" : "Next"}
          width={"40%"}
          height={"40%"}
          disabled={!isTodayString(selectedDate)}
          onPressButton={handleNextStep}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  stepButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "auto",
    width: "80%",
    flexWrap: "wrap",
  },
  stepButton: {
    width: 28,
    height: 28,
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    margin: 8,
  },
  activeStep: {
    backgroundColor: PRIMARY_COLOR,
    color: "white",
    borderWidth: 0,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: "10%",
    alignSelf: "flex-start",
  },
});
