import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SelectionButton } from "../SelectionButton";

const BREAKFAST = "Breakfast";
const MORNING_SNACK = "Morning Snack";
const LUNCH = "Lunch";
const AFTERNOON_SNACK = "Afternoon Snack";
const DINNER = "Dinner";

export const CategoryList = () => {
  const [selected, isSelected] = useState(BREAKFAST);

  const onPressButton = (item) => {
    isSelected(item);
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categorySelection}
    >
      <SelectionButton
        title={BREAKFAST}
        isSelected={selected === BREAKFAST}
        onPressButton={onPressButton}
      />
      <SelectionButton
        title={MORNING_SNACK}
        isSelected={selected === MORNING_SNACK}
        onPressButton={onPressButton}
      />
      <SelectionButton
        title={LUNCH}
        isSelected={selected === LUNCH}
        onPressButton={onPressButton}
      />
      <SelectionButton
        title={AFTERNOON_SNACK}
        isSelected={selected === AFTERNOON_SNACK}
        onPressButton={onPressButton}
      />
      <SelectionButton
        title={DINNER}
        isSelected={selected === DINNER}
        onPressButton={onPressButton}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  categorySelection: {
    marginVertical: 12,
  },
});
