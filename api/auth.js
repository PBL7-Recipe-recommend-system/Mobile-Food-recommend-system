import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";

const AUTH_ENDPOINT = endpoints.AUTH;

export const authenticate = (email, password) => {
  const res = axiosClient
    .post(`${AUTH_ENDPOINT}/authenticate`, {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("token", res.data.accessToken);
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

export const logOut = () => {
  const res = axiosClient
    .post(`${AUTH_ENDPOINT}/logout`)
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.removeItem("token");
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

export const registerAPI = (data) => {
  const res = axiosClient
    .post(`${AUTH_ENDPOINT}/register`, data)
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("token", res.data.accessToken);
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

export const sendOTP = (email) => {
  const res = axiosClient
    .put(`${AUTH_ENDPOINT}/regenerate-otp?email=${email}`)
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("emailReset", email);
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

export const verifyOTP = (email, value) => {
  const res = axiosClient
    .post(`${AUTH_ENDPOINT}/otp-verification?email=${email}`, value)
    .then((res) => {
      if (res.status === 200) {
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
export const updateNewPassword = (email, value) => {
  const res = axiosClient
    .put(`${AUTH_ENDPOINT}/set-password?email=${email}`, value)
    .then((res) => {
      if (res.status === 200) {
        AsyncStorage.setItem("token", res.data.accessToken);
        return res;
      } else if (res.status !== 200) {
        console.log(res);
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return error;
    });
  return res;
};
