import Router from "express";
import { teacherRouter } from "./teacher.route.js";
import { userRouter } from "./user.route.js";
import { subjectRouter } from "./subject.route.js";
import { routineRouter } from "./routine.route.js";
import { collegeRouter } from "./college.route.js";
import { facultyRouter } from "./faculty.route.js";

export const indexRouter = Router();

indexRouter.use("/teachers", teacherRouter);
indexRouter.use("/auth", userRouter);
indexRouter.use("/subjects", subjectRouter);
indexRouter.use("/generate", routineRouter);
indexRouter.use("/college", collegeRouter);

indexRouter.use("/faculty", facultyRouter);
