import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoints } from "../utils/path";
import axiosClient from "../helper/http";

const USER_ENDPOINT = endpoints.USERS;

export const setUpPersonalize = async (data) => {
  const res = axiosClient
    .put(`${USER_ENDPOINT}/me`, data)
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else if (res.status === 401) {
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const me = async () => {
  const res = axiosClient
    .get(`${USER_ENDPOINT}/me`)
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("user", JSON.stringify(res.data));
        return res;
      } else if (res.status === 401) {
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return error;
    });
  return res;
};
