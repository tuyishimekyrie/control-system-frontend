export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  id?: string;
  userId?: string;
};
export type RegisterRequestData = {
  orgName?: string;
  schoolName?: string;
  parentName?: string;
  email: string;
  password: string;
  role: string;
  isOrganization?: boolean;
  isSchool?: boolean;
  isParent?: boolean;
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
  isOrganization?: boolean;
  organizationId?: string;
  macAddress: string;
  isSchool?: boolean;
  schoolId?: string;
  isParent?: boolean;
  parentId?: string;
};
