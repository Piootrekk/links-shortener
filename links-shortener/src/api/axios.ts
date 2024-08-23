import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: backend,
  withCredentials: true,
});

export default axiosInstance;
