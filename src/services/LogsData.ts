import { apiClient } from "./apiClient";

type ActivityLog = {
  date: string;
  name: string;
  email: string;
  url: string;
  duration: string;
};

export const fetchUserLogs = async (): Promise<ActivityLog[]> => {
  const response = await apiClient.get("/user/logs");
  console.log("API Response:", response.data);
  return response.data;
};
