import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";
import {
  getCurrentCaloriesPerMeal,
  getRatioOfMeals,
  isTodayString,
  toCamelCase,
} from "../../utils/formatData";
import { generateNumberOfMeals } from "../../utils/meals";
import { AddDropDown } from "./AddDropDown";
import { FoodItem } from "./FoodItem";
import { Popup, Toast } from "react-native-popup-confirm-toast";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR } from "../../constants/color";

export const MealList = ({
  dataSource,
  planType,
  setSelectedMeals,
  handleRemoveMeal,
}) => {
  const [mealsList, setMealsList] = useState([]);
  const [dataMeals, setDataMeals] = useState(dataSource);
  const [mealRatio, setMealRatio] = useState([]);
  const [caloriesPerMeal, setCaloriesPerMeal] = useState([]);
  const navigation = useNavigation();

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
      const ratio = await getRatioOfMeals(user.meals, user.recommendCalories);
      setMealRatio(ratio);
      const calories = await getCurrentCaloriesPerMeal();
      setCaloriesPerMeal(calories);
      setMealsList(meals);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataMeals(getDataMeals(dataSource, mealsList));
  }, [dataSource]);

  const handleRemoveMeals = (meal, date) => {
    console.log(meal, date);
    const updatedDataMeals = dataMeals.map((mealData) => {
      if (mealData[meal]) {
        return {
          ...mealData,
          [meal]: [],
        };
      }
      return mealData;
    });
    console.log(updatedDataMeals);
    setDataMeals(updatedDataMeals);
    handleRemoveMeal(date);
  };

  const handleCheckMeal = (recipe, meal) => {
    const ratio = mealRatio.find((item) => item.meal === toCamelCase(meal));
    const calories = caloriesPerMeal.find(
      (item) => item.meal === toCamelCase(meal)
    );
    const warningCalories = recipe.calories + calories.calories;
    if (ratio.ratio < warningCalories && isTodayString(dataSource.date)) {
      Popup.show({
        type: "confirm",
        title: "Warning!",
        textBody: "This meal will exceed the recommended calories!",
        buttonText: "Continue",
        confirmText: "Cancel",
        callback: () => {
          navigation.navigate("DetailedRecipe", {
            id: recipe.recipeId,
            meal: meal,
          });
          Popup.hide();
        },
        cancelCallback: () => {
          Popup.hide();
        },

        okButtonStyle: {
          backgroundColor: PRIMARY_COLOR,
        },
      });
    } else {
      navigation.navigate("DetailedRecipe", {
        id: recipe.recipeId,
        meal: meal,
      });
    }
  };

  return (
    <View style={style.container}>
      {dataMeals &&
        dataMeals.length !== 0 &&
        dataMeals.map((meal, index) => (
          <View key={index}>
            {planType === CUSTOM_TAB ? (
              <View className="mx-[30px]">
                <AddDropDown
                  title={mealsList[index]}
                  data={meal[mealsList[index]]}
                  handleRemoveMeals={handleRemoveMeals}
                />
              </View>
            ) : (
              <FoodItem
                item={meal[mealsList[index]]}
                meal={mealsList[index]}
                planType={planType}
                handleCheckMeal={handleCheckMeal}
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
