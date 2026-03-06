import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://expense-tracker-backend-bquz.onrender.com",
});

export default axiosInstance;
