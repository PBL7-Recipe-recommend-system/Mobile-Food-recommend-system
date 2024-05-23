import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SelectionButton } from "../SelectionButton";
import { BREAKFAST, generateNumberOfMeals } from "../../utils/meals";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CategoryList = () => {
  const [selected, isSelected] = useState(BREAKFAST);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem("user");
      console.log(user);
    };
    fetchData();
  }, []);

  const mealsList = generateNumberOfMeals(3);

  const onPressButton = (item) => {
    isSelected(item);
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categorySelection}
    >
      {mealsList.map((meal) => (
        <SelectionButton
          key={meal}
          title={meal}
          isSelected={selected === meal}
          onPressButton={onPressButton}
        />
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  categorySelection: {
    width: "120%",
    marginVertical: 12,
    left: 30,
  },
});
