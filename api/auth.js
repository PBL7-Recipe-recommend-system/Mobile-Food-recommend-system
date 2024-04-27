import http from "../utils/http";

export const authenticate = (data) => {
  return http.post("/authenticate", data);
};

export const register = (data) => {
  return http.post("/register", data);
};
