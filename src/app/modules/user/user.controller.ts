import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import globalErrorHandler from "../../middlewares/globalErrorHandler";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    // const { error, value } = studentValidationSchema.validate(studentData);
    // console.log(error, value);

    // will call service function to send this data

    // if (!error) {
    //   const result = await StudentServices.createStudentIntoDB(value);
    //   res.status(201).json({
    //     success: true,
    //     message: "Student created succesfully",
    //     data: result,
    //   });
    // } else {
    //   res.status(500).json({
    //     success: false,
    //     message: "Validation Error",
    //     error: error.details,
    //   });
    // }

    // zod validation
    // const zodParsedData = studentValidationShema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // res.status(201).json({
    //   success: true,
    //   message: "Student created succesfully",
    //   data: result,
    // });
    sendResponse(res, {
      statuseCode: httpStatus.OK,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
