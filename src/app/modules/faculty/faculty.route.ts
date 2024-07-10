import express from "express";
import { FacultyControllers } from "./faculty.controller";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);
router.get("/:facultyId", FacultyControllers.getSingleFacultyById);

export const FacultyRoutes = router;
