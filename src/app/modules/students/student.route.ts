import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will call cntroller function
router.post("/create-student", StudentControllers.createStudent);
router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getSingleStudentById);

export const StudentRoutes = router;
