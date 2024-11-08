import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async(req, res) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course Created Successfully',
        data: result
    })
});

export const OfferedCourseController = {createOfferedCourse};