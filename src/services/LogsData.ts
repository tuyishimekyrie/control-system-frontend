import { apiClient } from "./apiClient";

type ActivityLog = {
  date: string;
  name: string;
  email: string;
  url: string;
  duration: string;
  createdAt: string;
};

export const fetchUserLogs = async (): Promise<ActivityLog[]> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  console.log(accessToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.get("/user/logs/all", { headers });
  console.log("API Response:", response);
  return response.data;
};

export const fetchTotalTimeSpentPerWebsite = async (selectedFilter: string) => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.get(
    `/user/logs/total-time-per-website?filter=${selectedFilter}`,
    { headers },
  );

  console.log("Web Time Spent:", response.data);
  return response.data;
};
