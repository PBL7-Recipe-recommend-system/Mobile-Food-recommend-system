import React from "react";
import { View, StyleSheet } from "react-native";
import { AddFoodItem } from "./AddFoodItem";
import { BREAKFAST, DINNER, LUNCH } from "./../../utils/meals";
import { FoodItem } from "./FoodItem";

export const MealList = () => {
  return (
    <View style={style.container}>
      <FoodItem />
      <AddFoodItem title={LUNCH} />
      <AddFoodItem title={DINNER} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
});
