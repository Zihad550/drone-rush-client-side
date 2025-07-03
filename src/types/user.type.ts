import type { USER_ROLE } from "@/constants";

export default interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: TUserRole;
  status: TUserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type TUserStatus = "active" | "blocked";

// export interface IUserName {
//   firstName: string;
//   middleName: string;
//   lastName: string;
// }
