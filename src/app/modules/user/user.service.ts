import config from "../../config";
// import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { AcademicSemister } from "../academicSemister/academicSemister.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemister.findById(
    payload.admissionSemester
  );

  const validAdmissionSemester = admissionSemester!;

  // set generated id
  userData.id = await generateStudentId(validAdmissionSemester);

  //   create a user
  const newUser = await User.create(userData); // built in static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
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
