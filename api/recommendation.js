import axios from "axios";
import {
  LOCAL_RECOMMENDATION_API_PATH,
  COMPANY_RECOMMENDATION_API_PATH,
} from "../utils/path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateMealPlan } from "../utils/meals";

export const getRecommendation = async (day) => {
  try {
    const userString = await AsyncStorage.getItem("user");
    const user = JSON.parse(userString);
    const mealsPercents = generateMealPlan(user.meals);

    const data = {
      id: user.id,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      activity: user.dailyActivities,
      weightLoss: user.dietaryGoal,
      mealsCaloriesPerc: mealsPercents,
      includeIngredients: [],
      excludeIngredients: [],
    };
    const res = await axios.post(`${LOCAL_RECOMMENDATION_API_PATH}`, data);
    if (res.status === 200) {
      await AsyncStorage.setItem(
        "todayMeals",
        JSON.stringify(res.data.data.recommendations[0])
      );
      await AsyncStorage.setItem(
        "recommendation",
        JSON.stringify(res.data.data)
      );
      return res.data.data;
    } else if (res.status === 401) {
      throw new Error("Unauthorized");
    } else {
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
