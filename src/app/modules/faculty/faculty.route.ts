import express from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidation } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);
router.get("/:facultyId", FacultyControllers.getSingleFacultyById);
router.patch(
  "/:facultyId",
  validateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

export const FacultyRoutes = router;
