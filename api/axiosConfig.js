// utils/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.LOCAL_API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
