import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query);

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Faculties are fetched successfully",
    data: result,
  });
});

const getSingleFacultyById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(facultyId);

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Faculty is fetched successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.updateFacultyintoDB(facultyId, req.body);
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Faculty data is updated successfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFacultyById,
  updateFaculty,
};
