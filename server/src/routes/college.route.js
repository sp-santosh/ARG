import Router from "express";

import { CollegeController } from "../controller/college.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const collegeRouter = Router();
const collegeController = new CollegeController();

collegeRouter.post("/", authenticate, collegeController.saveCollege);
