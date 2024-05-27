import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const getTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const removeTokenFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {}
};

export const checkLogin = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token ? true : false;
  } catch (error) {}
};

export const getUserIdFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    var decoded = jwtDecode(token);
    return decoded.userId;
  } catch (error) {}
};

export const getUserRoleFromToken = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user;
  } catch (error) {}
};
