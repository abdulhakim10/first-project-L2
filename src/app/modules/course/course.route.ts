import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./crouse.controller";

const router = express.Router();

router.post("/create-course", validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse);

router.get("/", CourseControllers.getAllCourses);
router.get("/:id", CourseControllers.getSingleCourseFromDB);
router.delete("/:id", CourseControllers.deleteCourse);
export const CourseRoutes = router;