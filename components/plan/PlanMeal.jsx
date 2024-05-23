import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { DateList } from "./DateList";
import { MealList } from "./MealList";
import { PlanDescription } from "./PlanDescription";
import { NutritionBoard } from "./NutritionBoard";

export const PlanMeal = () => {
  return (
    <Animated.ScrollView
      contentContainerStyle={style.container}
      scrollEventThrottle={16}
    >
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        <PlanDescription />
      </View>
      <DateList />
      <MealList />
      <NutritionBoard />
    </Animated.ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
  },
  button: {
    marginHorizontal: "auto",
    width: "70%",
  },
  customButton: {
    paddingVertical: 18,
  },
});
