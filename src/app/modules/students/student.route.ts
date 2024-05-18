import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will call cntroller function
router.post("/create-student", StudentControllers.createStudent);

export const StudentRoutes = router;
