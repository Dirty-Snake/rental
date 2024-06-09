import { Role } from '../../roles/enums/role.enum';

export interface AuthPayload {
  id: string;
  username: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}
