import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // ----- creating custom static method -----
  if (await Student.isUserExist(studentData.id)) {
    throw new Error("User already exist");
  }
  const result = await Student.create(studentData); // built in static method

  // ----- creating custom instance method ------

  //   const student = new Student(studentData); //create an instance

  //   if (await student.isUserExist(studentData.id)) {
  //     throw new Error("User already exist");
  //   }

  //   const result = await student.save(); // built in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getStudentById = async (studentId: string) => {
  //   const result = await Student.findOne({ id: studentId });
  const result = await Student.aggregate([
    {
      $match: { id: studentId },
    },
  ]);
  return result;
};

const deleteStudentById = async (studentId: string) => {
  const result = await Student.updateOne(
    { id: studentId },
    { isDeleted: true }
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentById,
  deleteStudentById,
};
