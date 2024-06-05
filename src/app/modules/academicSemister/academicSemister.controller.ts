import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemisterServices } from "./academicSemister.service";

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemisterIntoDB(
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

  const result = await AcademicSemisterServices.updateAcademicSemesterIntoDB(
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

const getAllSemisters = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllSemistersFromDB();
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "All Academic Semisters fetched successfully",
    data: result,
  });
});

const getSingleSemisterById = catchAsync(async (req, res) => {
  const semesterId: string = req.params.id;
  const result = await AcademicSemisterServices.getSingleSemister(semesterId);
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Academic Semister fetched successfully",
    data: result,
  });
});

export const AcademicSemisterControllers = {
  createAcademicSemister,
  getAllSemisters,
  getSingleSemisterById,
  updateAcademicSemester,
};
