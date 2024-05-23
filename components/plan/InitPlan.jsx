import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../CustomButton";
import { PlanForm } from "./PlanForm";

export const InitPlan = () => {
  const handleContinue = () => {};
  return (
    <View style={style.container}>
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        <PlanForm />
      </View>
      <View style={style.button}>
        <CustomButton
          title={"Continue"}
          customStyle={style.customButton}
          width={"50%"}
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
