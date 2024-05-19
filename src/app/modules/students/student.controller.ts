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
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      data: err,
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
      data: err,
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
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentById,
  deleteSingleStudentById,
};
