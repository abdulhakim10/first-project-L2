import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate("academicFaculty"),
    query
  )
    .filter()
    .fields()
    .sort()
    .paginate();

  const result = facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const isExist = await Faculty.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user does not exist!");
  }

  const result = await Faculty.findOne({ id }).populate("academicFaculty");
  return result;
};

const updateFacultyintoDB = async (id: string, payload: Partial<TFaculty>) => {
  const isExist = await Faculty.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user does not exist!");
  }

  // destructuring the non premitive data
  const { name, ...remainingFacultyData } = payload;

  // declare an object to store modified data
  const modifiedFacultyData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFacultyData[`name${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedFacultyData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const isExist = await Faculty.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user does not exist");
  }

  // step-1 start session
  const session = await mongoose.startSession();

  try {
    // step-2 start transaction
    session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    ); // transaction-1

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty!");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    ); // transaction-2

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to dlete user");
    }

    // if session successfully done commit transaction and end the session
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
    // if session is not done anort transaction and end the server
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete Faculty");
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyintoDB,
  deleteFacultyFromDB,
};
