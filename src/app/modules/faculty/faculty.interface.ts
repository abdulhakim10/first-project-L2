import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// export type TGender = ;

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  blodGroup?: "A+" | "A-" | "B+" | "B-" | "AB-" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
  isUserExist(id: string): Promise<TFaculty> | null;
}
