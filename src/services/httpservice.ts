import axios from "axios";

const axiosConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
