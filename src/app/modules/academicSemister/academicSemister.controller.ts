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

export const AcademicSemisterControllers = {
  createAcademicSemister,
};
