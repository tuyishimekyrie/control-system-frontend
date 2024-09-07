export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  id?: string;
  userId?: string;
};
export type RegisterRequestData = {
  orgName: string;
  email: string;
  password: string;
  role: string;
  isOrganization: boolean;
};
export type loginFormData = {
  email: string;
  password: string;
  id?: string;
  userId?: string;
};

export type AddUserFormData = {
  email: string;
  password: string;
  role: string;
  isOrganization: boolean;
  organizationId: string;
  macAddress: string;
};
