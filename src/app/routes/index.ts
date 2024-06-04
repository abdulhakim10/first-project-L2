import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemisterRoutes } from "../modules/academicSemister/academicSemister.route";

const router = Router();

const moduleroutes = [
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/academic-semisters",
    route: AcademicSemisterRoutes,
  },
];

moduleroutes.forEach((route) => router.use(route.path, route.route));

export default router;
