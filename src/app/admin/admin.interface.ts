import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGender = "Male" | "Female" | "Other";
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB-"
  | "AB-"
  | "O+"
  | "O-";

export type TAdmin = {
  id: string;
  designation: string;
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: TGender;
  dateOfBirth?: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExist(id: string): Promise<TAdmin | null>;
}
