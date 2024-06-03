import { Schema, model } from "mongoose";
import {
  TAcademicSemister,
  TAcademicSemisterCode,
  TMonths,
  TAcademicSemisterName,
} from "./academicSemister.interface";

const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AcademicSemisterName: TAcademicSemisterName[] = [
  "Autumn",
  "Summar",
  "Fall",
];
const AcademicSemisterCode: TAcademicSemisterCode[] = ["01", "02", "03"];

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemisterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemisterCode,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemister = model<TAcademicSemister>(
  "AcademicSemister",
  academicSemisterSchema
);
