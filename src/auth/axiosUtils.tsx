import axios, { AxiosInstance } from "axios";
import jsCookie from "js-cookie";

const baseURL = "https://tareeq.sy/dashboard";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = jsCookie.get("accessToken");

  if (token) {
    config.headers[
      "Authorization"
    ] = `Bearer 195|LNXDj9yoibG2xSzRIbVprrfGHlCuhBK3gOaNH0qPe38ca804`;
  }
  return config;
});

export default axiosInstance;
