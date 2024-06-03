import { StudentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "All students data fetched successfully",
    data: result,
  });
});

const getSingleStudentById = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentById(studentId);
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Student data fetched successfully.",
    data: result,
  });
});

const deleteSingleStudentById = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentById(studentId);

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudentById,
  deleteSingleStudentById,
};
