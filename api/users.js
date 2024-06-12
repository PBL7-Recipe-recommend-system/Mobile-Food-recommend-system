import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
const USER_ENDPOINT = endpoints.USERS;

export const setUpPersonalize = (data) => {
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

export const me = () => {
  const res = axiosClient
    .get(`${USER_ENDPOINT}/me`)
    .then(async (res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("user", JSON.stringify(res.data));
        return res;
      } else {
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const changePassword = (value) => {
  const res = axiosClient
    .put(`${USER_ENDPOINT}/change-password`, value)
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("token", res.data.accessToken);
        return res;
      } else if (res.status !== 200) {
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const uploadAvatar = (image) => {
  const res = axiosClient
    .post(`${USER_ENDPOINT}/avatar`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log("Upload avatar successfully", res);
        return res;
      } else {
        console.log("Upload avatar failed", res);
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      console.log("Upload avatar error", error);
      return error;
    });

  return res;
};
