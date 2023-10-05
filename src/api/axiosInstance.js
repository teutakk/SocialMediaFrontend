import axios from "axios";
import { BASE_URL } from "./apiConfig";
const axiosInstance = axios.create({
  baseURL: BASE_URL, // OUR API BASE URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Retrieving the token
const token = localStorage.getItem("token");
// adding the authorization token
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;
