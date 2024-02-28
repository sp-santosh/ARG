import Router from "express";
import { SubjectController } from "../controller/subject.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const subjectRouter = Router();
const subjectController = new SubjectController();

subjectRouter.post("/", authenticate, subjectController.saveSubject);

subjectRouter.get("/:id", authenticate, subjectController.getSubjectById);
subjectRouter.get("/", authenticate, subjectController.getSubject);
subjectRouter.put("/:id", authenticate, subjectController.putSubject);
subjectRouter.delete("/:id", authenticate, subjectController.deleteSubject);
