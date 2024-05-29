import { endpoints } from "../utils/path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../helper/http";

const SAVED_PATH = endpoints.SAVED_RECIPES;
const USER_PATH = endpoints.USERS;

export const getSavedRecipes = async () => {
  return axiosClient.get(`${USER_PATH}${SAVED_PATH}`).then(async (res) => {
    if (res.status === 200) {
      await AsyncStorage.setItem("savedRecipes", JSON.stringify(res.data));
      return res;
    } else {
      return Promise.reject(res);
    }
  });
};

export const saveRecipe = async (id, save) => {
  return axiosClient
    .post(`${USER_PATH}${SAVED_PATH}?foodId=${id}&save=${save}`)
    .then(async (res) => {
      if (res.status === 200) {
        return res;
      } else {
        return Promise.reject(res);
      }
    });
};
