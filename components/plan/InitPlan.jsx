import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../CustomButton";
import { PlanForm } from "./PlanForm";
import { addMealPlan } from "../../api/plan";
import { formatDate } from "../../utils/formatData";

export const InitPlan = () => {
  const [formValue, setFormValue] = useState({
    description: "",
    date: "01-12-2024",
    mealCount: 3,
    dailyCalorie: 2000,
    totalCalorie: 8000,
  });
  useEffect(() => {}, [formValue]);

  const handleSubmitForm = async () => {
    const currentDate = new Date();
    formValue.date = formatDate(currentDate);
    await addMealPlan(formValue);
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
