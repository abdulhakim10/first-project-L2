import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const { error, value } = studentValidationSchema.validate(studentData);
    // console.log(error, value);

    // will call service function to send this data

    if (!error) {
      const result = await StudentServices.createStudentIntoDB(value);
      res.status(201).json({
        success: true,
        message: "Student created succesfully",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Validation Error",
        error: error.details,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students data fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: err,
    });
  }
};

const getSingleStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentById(studentId);
    res.status(200).json({
      success: true,
      message: "Student data fetched successfully.",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: err,
    });
  }
};

const deleteSingleStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentById(studentId);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentById,
  deleteSingleStudentById,
};
