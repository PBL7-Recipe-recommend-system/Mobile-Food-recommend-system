import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SelectionButton } from "../SelectionButton";
import { BREAKFAST, generateNumberOfMeals } from "../../utils/meals";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";

export const CategoryList = ({ value, setValue }) => {
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromStorage();
      setMealsList(generateNumberOfMeals(user.meals));
    };
    fetchData();
  }, []);

  const onPressButton = (item) => {
    setValue(item);
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
          isSelected={value === meal}
          onPressButton={onPressButton}
        />
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  categorySelection: {
    marginVertical: 12,
    paddingRight: 30,
    left: 30,
  },
});
