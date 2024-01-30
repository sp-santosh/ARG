import Router from "express";
import { SubjectController } from "../controller/subject.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const subjectRouter = Router();
const subjectController = new SubjectController();

subjectRouter.post("/", authenticate, subjectController.saveSubject);

subjectRouter.get("/:id", subjectController.getSubjectById);
