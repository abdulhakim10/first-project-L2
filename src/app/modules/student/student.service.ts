import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async () => {
  const result = await Student.find({})
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getStudentById = async (id: string) => {
  //   const result = await Student.findOne({ id: studentId });
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const isExist = await Student.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user does not exist");
  }
  // destructuring non primitive data
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  // declare an object to store modified data
  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedStudentData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const isExist = await Student.isUserExist(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user does not exist");
  }

  // step-1: create a session
  const session = await mongoose.startSession();

  try {
    // step-2: start transaction
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session } // transaction-1
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session } // transaction-2
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    // step-3: if session successfully done commit transaction and end the sessioon
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    // step-4: if the session failed abort the transaction and end the session
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentById,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
