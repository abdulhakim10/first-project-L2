import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcdemicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Semister Code!");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const getAllSemestersFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

export const AcademicSemesterServices = {
  createAcdemicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
};
