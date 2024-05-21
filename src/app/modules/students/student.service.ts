import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  //   const result = await StudentModel.create(student); // built in static method

  const student = new Student(studentData); //create an instance

  if (await student.isUserExist(studentData.id)) {
    throw new Error("User already exist");
  }

  const result = await student.save(); // built in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getStudentById = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId });
  return result;
};

const deleteStudentById = async (studentId: string) => {
  const result = await Student.deleteOne({ id: studentId });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentById,
  deleteStudentById,
};
