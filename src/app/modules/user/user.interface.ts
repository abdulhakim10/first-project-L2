import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isUserDeletedCheckByCustomId(id: string): Promise<TUser>;
  isUserBlockedCheckByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}
