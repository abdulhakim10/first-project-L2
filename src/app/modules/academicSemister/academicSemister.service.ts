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

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemister>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemisterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemister.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    }
  );
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
  updateAcademicSemesterIntoDB,
  getAllSemistersFromDB,
  getSingleSemister,
};
