import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(201).json({
      success: true,
      message: "Student created succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
};
