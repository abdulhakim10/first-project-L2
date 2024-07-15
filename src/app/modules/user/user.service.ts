/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generatedAdminId,
  generatedFacultyId,
  generateStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  // null check to avoid typeScript error
  const validAdmissionSemester = admissionSemester!;

  // 1st step: start a session
  const session = await mongoose.startSession();

  try {
    // 2nd step: start a transaction
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(validAdmissionSemester);

    //   create a user (transaction-1) isolate session
    const newUser = await User.create([userData], { session }); // built in static method

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2) isolate session
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    // 3rd step: if session successfully done commit transaction and end the session
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    // if the session failed abort the transaction and end the session
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set faculty role
  userData.role = "faculty";

  // step1: start a session
  const session = await mongoose.startSession();

  try {
    // step2: start transaction
    session.startTransaction();

    // set generated id
    userData.id = await generatedFacultyId();

    // create a user (transaction-1) isolate session
    const newUser = await User.create([userData], { session });
    // create faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a faculty (transaction-2) isolate session
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // 3rd step: if session successfully done commit transaction and end the session
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object to stor data
  const userData: Partial<TUser> = {};

  // if password is not given set default password
  userData.password = password || (config.default_password as string);

  // set admin role
  userData.role = "admin";

  // step-1 start a session
  const session = await mongoose.startSession();

  try {
    // step-2 start transaction
    session.startTransaction();

    // set generated id
    userData.id = await generatedAdminId();

    // create user (transaction-1) isolate session
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create admin (transaction-2) isolate session
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    // step-3 if session successfully done commit transaction and the session
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    // if session is failed abort transaction and end the session
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};

// ----- creating custom static method -----
//   if (await Student.isUserExist(studentData.id)) {
//     throw new Error("User already exist");
//   }

// ----- creating custom instance method ------

//   const student = new Student(studentData); //create an instance

//   if (await student.isUserExist(studentData.id)) {
//     throw new Error("User already exist");
//   }

//   const result = await student.save(); // built in instance method
