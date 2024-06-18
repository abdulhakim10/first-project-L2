import { Student } from "./student.model";

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

const getStudentById = async (studentId: string) => {
  //   const result = await Student.findOne({ id: studentId });
  const result = await Student.findById(studentId)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
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
  getAllStudentsFromDB,
  getStudentById,
  deleteStudentById,
};
