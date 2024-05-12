import axios from "axios";
import { LOCAL_COMPANY_API_PATH, LOCAL_HOME_API_PATH } from "../utils/path";
import { getTokenFromAsyncStorage } from "../utils/token";
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: LOCAL_HOME_API_PATH,
      name: "Food recommendation App",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      ({ response }) => {
        if (response.data.status === 400) {
          return Promise.reject(response.data.data);
        }
        const result = { ...response.data, status: response.status };
        return Promise.reject(result);
      }
    );
    this.instance.interceptors.request.use(
      async (config) => {
        if (!config.url.includes("/auth")) {
          const token = await getTokenFromAsyncStorage();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  }
  get(url, config = null) {
    return this.instance.get(url, config);
  }
  post(url, data, config = null) {
    return this.instance.post(url, data, config);
  }
  put(url, data, config = null) {
    return this.instance.put(url, data, config);
  }
  patch(url, data, config = null) {
    return this.instance.patch(url, data, config);
  }
  delete(url, data, config = null) {
    return this.instance.delete(url, {
      data,
      ...config,
    });
  }
}

const axiosClient = new Http();

export default axiosClient;
