import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
import { me } from "./users";
const PLAN_ENDPOINT = endpoints.PLAN;

export const addMealPlan = async (data) => {
  return axiosClient.post(`${PLAN_ENDPOINT}`, data).then(async (res) => {
    if (res.status === 200) {
      await me();
      return res;
    } else {
      return Promise.reject(res);
    }
  });
};

export const updateMealPlan = async (data) => {
  return axiosClient.put(`${PLAN_ENDPOINT}`, data).then(async (res) => {
    if (res.status === 200) {
      await me();
      return res;
    } else {
      return Promise.reject(res);
    }
  });
};

export const getMealPlan = async () => {
  return axiosClient.get(`${PLAN_ENDPOINT}`).then(async (res) => {
    if (res.status === 200) {
      await AsyncStorage.setItem("mealPlan", JSON.stringify(res.data));
      return res;
    } else {
      return Promise.reject(res);
    }
  });
};
