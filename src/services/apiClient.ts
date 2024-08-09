import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api/v1",
});
