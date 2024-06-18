import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidation } from "./student.validation";

const router = express.Router();

// will call cntroller function
router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getSingleStudentById);
router.delete("/:studentId", StudentControllers.deleteStudentById);
router.patch(
  "/:studentId",
  validateRequest(StudentValidation.updateStudentValidationShema),
  StudentControllers.updateStudent
);

export const StudentRoutes = router;
