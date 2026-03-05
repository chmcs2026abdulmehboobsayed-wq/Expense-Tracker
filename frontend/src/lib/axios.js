import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://expense-tracker-dloi.onrender.com/expenses",
});

export default axiosInstance;
