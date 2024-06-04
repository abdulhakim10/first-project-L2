import express from "express";
import { AcademicSemisterControllers } from "./academicSemister.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemisterValidetions } from "./academicSemister.validation";

const router = express.Router();

router.post(
  "/create-academic-semister",
  validateRequest(
    AcademicSemisterValidetions.createAcademicSemisterValidetionSchema
  ),
  AcademicSemisterControllers.createAcademicSemister
);

export const AcademicSemisterRoutes = router;
