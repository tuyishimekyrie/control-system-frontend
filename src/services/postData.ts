import { loginFormData, RegisterFormData } from "../types/RegisterForm";
import { apiClient } from "./apiClient";

type MutationResponse = {
    message: string;
    
};

export const postData = async ( data: RegisterFormData): Promise<MutationResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const postLoginData = async (
  data: loginFormData
): Promise<MutationResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
