import { BlockFormData, Website } from "../types/BlockWebsite";
import { responseNotifications } from "../types/notifications";
import { loginFormData, RegisterFormData } from "../types/RegisterForm";
import { apiClient } from "./apiClient";

type MutationResponse = {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
};
export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
};

export const postData = async (
  data: RegisterFormData,
): Promise<MutationResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const postLoginData = async (
  data: loginFormData,
): Promise<MutationResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  console.log("Fetched Users:", response.data);
  return response.data;
};

export const blockWebsite = async (
  data: BlockFormData,
): Promise<MutationResponse> => {
  const response = await apiClient.post("/block", data);
  return response.data;
};

export const fetchBlockedWebsite = async (): Promise<Website[]> => {
  const response = await apiClient.get("/block");
  console.log("Fetched blockWebsite:", response.data);
  return response.data;
};

export const fetchManagerNotifications = async (): Promise<responseNotifications> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
 console.log(accessToken)
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get("/notifications", { headers });
  console.log("Fetched Notifications:+++++++++", response.data);
  return response.data;
};