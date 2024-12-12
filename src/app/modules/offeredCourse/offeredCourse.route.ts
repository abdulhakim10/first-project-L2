import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredcourse.controller";




const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse
);

router.get(
  "/",
  OfferedCourseController.getAllOfferedCourse
);

export const OfferedCourseRoutes = router;
