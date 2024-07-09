import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcdemicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Academic Semister is created successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.id;
  const payload = req.body;

  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    payload
  );
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Academic Semester updated successfully",
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemestersFromDB(
    req.query
  );
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "All Academic Semisters fetched successfully",
    data: result,
  });
});

const getSingleSemesterById = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleSemesterFromDB(semesterId);
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Academic Semister fetched successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemesterById,
  updateAcademicSemester,
};
