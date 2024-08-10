import axios from "axios";

export const apiClient = axios.create({
  baseURL:"https://control-system-backend.onrender.com/api/v1" ,
});
