import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.semesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
