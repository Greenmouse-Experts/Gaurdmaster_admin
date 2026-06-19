import type { Role } from "./roles";

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePic: string | null;
  roleId: string;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}
