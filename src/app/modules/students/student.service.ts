import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find({});
  return result;
};

const getStudentById = async (studentId: string) => {
  const result = await StudentModel.findOne({ id: studentId });
  return result;
};

const deleteStudentById = async (studentId: string) => {
  const result = await StudentModel.deleteOne({ id: studentId });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentById,
  deleteStudentById,
};
