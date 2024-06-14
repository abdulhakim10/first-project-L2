import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademficFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademficFacultyControllers.createAcademicFaculty,
);

router.get(
  "/:facultyId",
  AcademficFacultyControllers.getSingleAcademicFacultyById,
);

router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademficFacultyControllers.updateAcademicFaculty,
);

router.get("/", AcademficFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
