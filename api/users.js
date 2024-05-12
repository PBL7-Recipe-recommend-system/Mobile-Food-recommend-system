import { endpoints } from "../utils/path";

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
