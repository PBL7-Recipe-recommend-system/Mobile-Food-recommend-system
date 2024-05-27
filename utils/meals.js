import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserFromStorage } from "./asyncStorageUtils";
import { formatDate } from "./formatData";

export const BREAKFAST = "Breakfast";
export const MORNING_SNACK = "Morning Snack";
export const LUNCH = "Lunch";
export const AFTERNOON_SNACK = "Afternoon Snack";
export const DINNER = "Dinner";

export const generateNumberOfMeals = (numberOfMeals) => {
  if (numberOfMeals === 3) {
    return [BREAKFAST, LUNCH, DINNER];
  }
  if (numberOfMeals === 4) {
    return [BREAKFAST, MORNING_SNACK, LUNCH, DINNER];
  }
  if (numberOfMeals === 5) {
    return [BREAKFAST, MORNING_SNACK, LUNCH, AFTERNOON_SNACK, DINNER];
  }
};

export const generateMealPlan = (numberOfMeals) => {
  if (numberOfMeals === 3) {
    return { breakfast: 0.35, lunch: 0.4, dinner: 0.25 };
  }
  if (numberOfMeals === 4) {
    return { breakfast: 0.3, morningSnack: 0.05, lunch: 0.4, dinner: 0.25 };
  }
  if (numberOfMeals === 5) {
    return {
      breakfast: 0.3,
      morningSnack: 0.05,
      lunch: 0.4,
      afternoonSnack: 0.05,
      dinner: 0.2,
    };
  }
};

export const getRecommendationFromStorage = async () => {
  const recommendationString = await AsyncStorage.getItem("recommendation");
  return JSON.parse(recommendationString);
};

export const getRecommendationFromStorageByMeals = async (meals) => {
  const recommendationString = await AsyncStorage.getItem("recommendation");
  return JSON.parse(recommendationString);
};

export const getTodayMeals = async (meals) => {
  const todayMealsString = await AsyncStorage.getItem("todayMeals");
  const todayMeals = JSON.parse(todayMealsString);
  if (meals) {
    return todayMeals[meals];
  } else {
    return todayMeals;
  }
};

export const generateDays = (numberOfDays) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const result = [];
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayOfWeek = daysOfWeek[date.getDay()].slice(0, 3);
    const dateOfWeek = `${date.getDate()} ${dayOfWeek}`;
    result.push({
      date: formatDate(date),
      dateOfWeek,
    });
  }
  return result;
};
