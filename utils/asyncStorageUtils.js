import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserFromStorage = async () => {
  const data = await AsyncStorage.getItem("user");
  return JSON.parse(data);
};

export const getMealPlanFromStorage = async () => {
  const data = await AsyncStorage.getItem("mealPlan");
  return JSON.parse(data);
};

export const getMealAddingFromStorage = async () => {
  const data = await AsyncStorage.getItem("mealAdding");
  return JSON.parse(data);
};

export const setMealAddingToStorage = async (data) => {
  await AsyncStorage.setItem("mealAdding", JSON.stringify(data));
};

export const getDateAddingFromStorage = async () => {
  const data = await AsyncStorage.getItem("dateAdding");
  return JSON.parse(data);
};

export const setDateAddingToStorage = async (data) => {
  await AsyncStorage.setItem("dateAdding", JSON.stringify(data));
};

export const getTrackingFromStorage = async () => {
  const data = await AsyncStorage.getItem("tracking");
  return JSON.parse(data);
};

export const getSearchOption = async () => {
  const data = await AsyncStorage.getItem("searchOption");
  return JSON.parse(data);
};
