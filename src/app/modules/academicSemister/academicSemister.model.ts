import { Schema, model } from "mongoose";
import { TAcademicSemister } from "./academicSemister.interface";
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from "./academicSemister.constanct";

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
      type: String,
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
