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

router.get("/", AcademicSemisterControllers.getAllSemisters);
router.get("/:id", AcademicSemisterControllers.getSingleSemisterById);
export const AcademicSemisterRoutes = router;
