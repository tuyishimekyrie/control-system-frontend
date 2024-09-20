import { BlockFormData, Website } from "../types/BlockWebsite";
import { responseNotifications } from "../types/notifications";
import {
  loginFormData,
  RegisterRequestData,
  AddUserFormData,
} from "../types/RegisterForm";
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
  macAddress: string;
  ipAddress: string;
  isSubscribed?: string;
};
export type Organization = {
  id: string;
  name: string;
  maxUsers: number;
  createdAt: string;
};
export type School = {
  id: string;
  name: string;
  maxUsers: number;
  createdAt: string;
};
export type Parent = {
  id: string;
  name: string;
  maxUsers: number;
  createdAt: string;
};

export type userRole = {
  role: string;
};

export const postData = async (
  data: RegisterRequestData,
): Promise<MutationResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};
export const AddUser = async (
  data: AddUserFormData,
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
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  console.log(accessToken);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get("/users", { headers });
  console.log("Fetched Users:", response.data);
  return response.data;
};

export const fetchUserByEmail = async (email: string): Promise<User> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  console.log(accessToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.get(`/user/${email}`, { headers });
  console.log("Fetched User by Email:", response.data);

  return response.data;
};

export const blockWebsite = async (
  data: BlockFormData,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.post("/block", data, { headers });
  console.log("Website Blocked:", response.data);

  return response.data;
};

export const fetchBlockedWebsite = async (): Promise<Website[]> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiClient.get("/block", { headers });
  console.log("Fetched Blocked Websites:", response.data);

  return response.data;
};

export const fetchManagerNotifications =
  async (): Promise<responseNotifications> => {
    let accessToken = localStorage.getItem("net-token") || "";
    accessToken = accessToken.replace(/^"|"$/g, "");
    console.log(accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await apiClient.get("/notifications", { headers });
    return response.data;
  };
export const updateSubscription = async (
  id: string,
): Promise<MutationResponse> => {
  const response = await apiClient.patch(`/subscribe/${id}`);
  return response.data;
};
export const deleteUser = async (id: string): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.delete(`/users/${id}`, { headers });
  return response.data;
};

export const updateRole = async (
  id: string,
  data: userRole,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.put(`/users/${id}`, data, { headers });
  return response.data;
};

export const unBlockUrl = async (id: string): Promise<MutationResponse> => {
  const response = await apiClient.delete(`/block/${id}`);
  return response.data;
};

export const markNotificationAsSeen = async (notificationId: string) => {
  try {
    await apiClient.patch("/notifications", { id: notificationId });
  } catch (error) {
    console.error("Error marking notification as seen:", error);
    throw error;
  }
};

export const fetchOrganizations = async (): Promise<Organization[]> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get("/organizations", { headers });
  return response.data;
};

export const fetchSingleOrganization = async (
  id: string,
): Promise<Organization> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get(`/organizations/${id}`, { headers });
  return response.data;
};

export const updateOrganization = async (
  id: string,
  data: Partial<Organization>,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.patch(`/organizations/${id}`, data, {
    headers,
  });
  return response.data;
};

export const deleteOrganization = async (
  id: string,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.delete(`/organizations/${id}`, { headers });
  return response.data;
};

export const fetchParents = async (): Promise<Parent[]> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get("/parents", { headers });
  return response.data;
};

export const fetchSingleParent = async (id: string): Promise<Parent> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get(`/parents/${id}`, { headers });
  return response.data;
};

export const updateParent = async (
  id: string,
  data: Partial<Parent>,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.patch(`/parents/${id}`, data, {
    headers,
  });
  return response.data;
};

export const deleteParent = async (id: string): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.delete(`/parents/${id}`, { headers });
  return response.data;
};

export const fetchSchools = async (): Promise<School[]> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get("/schools", { headers });
  return response.data;
};

export const fetchSingleSchool = async (id: string): Promise<School> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.get(`/schools/${id}`, { headers });
  return response.data;
};

export const updateSchool = async (
  id: string,
  data: Partial<School>,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.patch(`/schools/${id}`, data, {
    headers,
  });
  return response.data;
};

export const deleteSchool = async (id: string): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.delete(`/schools/${id}`, { headers });
  return response.data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>,
): Promise<MutationResponse> => {
  let accessToken = localStorage.getItem("net-token") || "";
  accessToken = accessToken.replace(/^"|"$/g, "");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await apiClient.patch(`/users/${id}`, data, { headers });
  return response.data;
};

export const postForgotPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string,
): Promise<MutationResponse> => {
  const response = await apiClient.patch("/auth/update-password", {
    email,
    newPassword,
    confirmPassword,
  });
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await apiClient.get(`/user/${email}`);
  console.log("Fetched User by Email:", response.data);
  return response.data;
};
