import mongoose from "mongoose";
import config from "../../config";
// import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
  } catch (err) {
    // if the session failed abort the transaction and end the session
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
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
