import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../helper/http";

export const authenticate = (email, password) => {
  const res = http
    .post("/auth/authenticate", {
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

export const registerAPI = (data) => {
  const res = http
    .post("/auth/register", data)
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
export const hello = () => {
  return http.get("/hello");
};
