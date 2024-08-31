import { apiClient } from "./apiClient";

type ActivityLog = {
  date: string;
  name: string;
  email: string;
  url: string;
  duration: string;
};

export const fetchUserLogs = async (): Promise<ActivityLog[]> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  console.log(accessToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.get("/user/logs", { headers });
  console.log("API Response:", response.data);
  return response.data;
};

export const fetchTotalTimeSpentPerWebsite = async () => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  console.log(accessToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.get("/user/logs/total-time-per-website", {
    headers,
  });
  console.log("Web Time Spent:", response.data);
  return response.data;
};
