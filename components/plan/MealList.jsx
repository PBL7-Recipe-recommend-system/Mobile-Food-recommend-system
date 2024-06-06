import { StyleSheet, View } from "react-native";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";
import { useState, useEffect } from "react";
import { FoodItem } from "./FoodItem";
import { AddFoodItem } from "./AddFoodItem";
import { BREAKFAST, generateNumberOfMeals } from "../../utils/meals";
import { toCamelCase } from "../../utils/formatData";
import { daysSource } from "./../../constants/mockData";
import { RECOMMEND_TAB } from "../../constants/plan";

export const MealList = ({ dataSource, planType, setSelectedMeals }) => {
  const [mealsList, setMealsList] = useState([]);
  const [dataMeals, setDataMeals] = useState(dataSource);

  const getDataMeals = (data, mealsList) => {
    if (!data) {
      return mealsList.map((meal) => ({
        [meal]: [],
      }));
    }
    const dataMeals = mealsList.map((meal) => ({
      [meal]: data[toCamelCase(meal)],
    }));
    return dataMeals;
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromStorage();
      const meals = generateNumberOfMeals(
        planType === RECOMMEND_TAB ? user.meals : 5
      );
      setMealsList(meals);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataMeals(getDataMeals(dataSource, mealsList));
  }, [dataSource]);

  return (
    <View style={style.container}>
      {dataMeals &&
        dataMeals.length !== 0 &&
        dataMeals.map((meal, index) => (
          <View key={index}>
            {meal[mealsList[index]].length === 0 ? (
              <AddFoodItem title={mealsList[index]} />
            ) : (
              <FoodItem
                item={meal[mealsList[index]]}
                meal={mealsList[index]}
                planType={planType}
              />
            )}
          </View>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
});
