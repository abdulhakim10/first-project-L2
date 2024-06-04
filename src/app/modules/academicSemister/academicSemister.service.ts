import { academicSemisterNameCodeMapper } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";

const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) => {
  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semister Code!");
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllSemistersFromDB = async () => {
  const result = await AcademicSemister.find({});
  return result;
};

const getSingleSemister = async (id: string) => {
  const result = await AcademicSemister.findOne({ _id: id });
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAllSemistersFromDB,
  getSingleSemister,
};
