import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidationShema } from "../students/student.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidationShema.createStudentValidationShema),
  UserControllers.createStudent
);

export const UserRoutes = router;
