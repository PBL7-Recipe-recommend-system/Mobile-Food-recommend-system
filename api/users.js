import http from "../helper/http";
import { endpoints } from "../utils/path";
import { getUserIdFromToken } from "../utils/token";

const USER_ENDPOINT = endpoints.USERS;

export const setUpPersonalize = async (data) => {
  const userId = await getUserIdFromToken();
  const res = axiosClient
    .put(`${USER_ENDPOINT}/set-profile/${userId}`, data)
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
