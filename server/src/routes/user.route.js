import { UserController } from "../controller/user.controller.js";
import Router from "express";

const userController = new UserController();
export const userRouter = Router();

userRouter.post("/register/", userController.registerUser);

userRouter.post("/login", userController.loginUser);
