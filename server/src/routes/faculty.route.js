import Router from "express";

import { FacultyController } from "../controller/faculty.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const facultyRouter = Router();
const facultyController = new FacultyController();

facultyRouter.get("/", authenticate, facultyController.getFaculties);
