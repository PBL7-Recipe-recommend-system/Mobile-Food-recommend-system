import { endpoints } from "../utils/path";
import axiosClient from "../helper/http";
import { me } from "./users";
const TRACKING_ENDPOINT = endpoints.TRACKING;
export const getTrackingNutrition = async (date) => {
  return axiosClient
    .get(`${TRACKING_ENDPOINT}/nutrition?date=${date}`)
    .then(async (res) => {
      if (res.status === 200) {
        return res;
      } else {
        return Promise.reject(res);
      }
    });
};
export const setWaterIntake = async (date, amount) => {
  return axiosClient
    .post(
      `${TRACKING_ENDPOINT}/nutrition/water-intake?date=${date}&amount=${amount}`
    )
    .then(async (res) => {
      if (res.status === 200) {
        return res;
      } else {
        console.log("error", res);
        return Promise.reject(res);
      }
    });
};
