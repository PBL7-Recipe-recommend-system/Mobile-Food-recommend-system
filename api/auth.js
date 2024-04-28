import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "./axiosConfig";

export const authenticate = async (email, password) => {
  try {
    const response = await API.post("/auth/authenticate", {
      email: email,
      password: password,
    });
    console.log(response.data);
    AsyncStorage.setItem("token", response.data.Data.accessToken);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const register = (data) => {
  return http.post("/auth/register", data);
};
