import { Student } from "./student.model";

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
    { isDeleted: true },
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentById,
  deleteStudentById,
};
