import { Types } from "mongoose";

export type TPreRequisiteCourses = {
  course: Types.ObjectId; // it's actually (id) for ease course written here
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};
