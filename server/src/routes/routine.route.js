import Router from "express";
import { RoutineController } from "../controller/routine.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const routineRouter = Router();
const routineController = new RoutineController();


routineRouter.get("/", routineController.createChromosome);