import { Schema, model } from "mongoose";
import { TAcademicSemister } from "./academicSemister.interface";
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from "./academicSemister.constant";

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
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

academicSemisterSchema.pre("save", async function (next) {
  const isSemisterExist = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemisterExist) {
    throw new Error("Semister already exist !");
  }

  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  "AcademicSemister",
  academicSemisterSchema
);
