import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;
if (!backend) {
  throw new Error("BACKEND URL NOT PROVIDED");
}
const isProduction = import.meta.env.VITE_APP_MODE === "production";
const axiosInstance = axios.create({
  baseURL: isProduction ? backend : "http://localhost:3005",
  withCredentials: true,
});

export default axiosInstance;
