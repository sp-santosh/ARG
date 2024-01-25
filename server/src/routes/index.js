import Router from "express";
import { teacherRouter } from "./teacher.route.js";
import { userRouter } from "./user.route.js";

export const indexRouter = Router();

indexRouter.use("/teachers", teacherRouter);
indexRouter.use("/auth", userRouter);
