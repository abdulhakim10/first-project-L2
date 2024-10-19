
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

const getAllSemesterRegistration = catchAsync(async(req, res) => {

    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration is fetched successfully",
        data: result,
    });
});

const getSingleSemesterRegistration = catchAsync(async(req, res) => {

    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration is fetched successfully",
        data: result,
    });
})

export const SemesterRegistrationControllers = {
    createSemesterRegistration, 
    getAllSemesterRegistration,
    getSingleSemesterRegistration
}