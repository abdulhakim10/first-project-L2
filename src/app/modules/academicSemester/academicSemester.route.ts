import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemisterValidetions } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemisterValidetions.createAcademicSemesterValidetionSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemisterValidetions.updateAcademicSemesterValidetionSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);
router.get("/", AcademicSemesterControllers.getAllSemesters);
router.get("/:semesterId", AcademicSemesterControllers.getSingleSemesterById);
export const AcademicSemesterRoutes = router;
