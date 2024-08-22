import axios from "axios";

const backend = import.meta.env.BACKEND_URL;

const token = localStorage.getItem("authToken");
const axiosInstance = axios.create({
  baseURL: backend,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
