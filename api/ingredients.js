import { endpoints } from "../utils/path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../helper/http";
const INGREDIENTS_PATH = endpoints.INGREDIENTS;

export const searchIngredient = async (name) => {
  return axiosClient.get(`/ingredients?name=${name}`).then(async (res) => {
    if (res.status === 200) {
      return res;
    } else {
      return Promise.reject(res);
    }
  });
};

export const getIngredientList = async (type) => {
  return axiosClient
    .get(`${INGREDIENTS_PATH}?includeOrExclude=${type}`)
    .then(async (res) => {
      if (res.status === 200) {
        return res;
      } else {
        return Promise.reject(res);
      }
    });
};

export const addIngredients = async (type, data) => {
  return axiosClient
    .post(`${INGREDIENTS_PATH}?includeOrExclude=${type}`, data)
    .then(async (res) => {
      if (res.status === 200) {
        return res;
      } else {
        return Promise.reject(res);
      }
    });
};

export const removeIngredients = async (type, data) => {
  return axiosClient
    .delete(`${INGREDIENTS_PATH}?includeOrExclude=${type}`, data)
    .then(async (res) => {
      if (res.status === 200) {
        return res;
      } else {
        return Promise.reject(res);
      }
    });
};
