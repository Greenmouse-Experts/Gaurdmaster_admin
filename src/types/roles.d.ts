export interface Role {
  id: string;
  name: string;
  description: string;
  usersCount?: number;
  permissions?: string[];
  isSystemRole?: boolean;
  createdAt: string;
  updatedAt: string;
}
