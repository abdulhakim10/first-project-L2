
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import sendResponse from "../../utils/sendResponse";

const createSemesterRegistration = catchAsync(async(req, res) => {

    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration is created successfully",
        data: result,
    });
});

export const SemesterRegistrationControllers = {
    createSemesterRegistration
}