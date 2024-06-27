import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { addMealPlan, getMealPlan } from "../../api/plan";
import { formatDate } from "../../utils/formatData";
import CustomButton from "../CustomButton";
import { PlanForm } from "./PlanForm";
import { me } from "../../api/users";

export const InitPlan = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [formValue, setFormValue] = useState({
    description: "New Plan",
    date: new Date(),
    mealCount: 0,
    dailyCalories: 2000,
    totalCalories: 8000,
  });
  useEffect(() => {}, [formValue]);

  const handleSubmitForm = async () => {
    try {
      const currentDate = new Date();
      formValue.date = formatDate(currentDate);
      console.log(formValue);
      await addMealPlan(formValue);
      await me();
      await getMealPlan();
    } catch (error) {
    } finally {
      setLoading(false);
      navigation.push("PlanStack");
    }
  };

  return (
    <View style={style.container}>
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        <PlanForm value={formValue} setValue={setFormValue} />
      </View>
      <View style={style.button}>
        <CustomButton
          title={"Continue"}
          customStyle={style.customButton}
          width={"50%"}
          onPressButton={handleSubmitForm}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    height: "100%",
  },
  button: {
    marginHorizontal: "auto",
    marginVertical: 40,
    paddingHorizontal: 30,
  },
  customButton: {
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
});
