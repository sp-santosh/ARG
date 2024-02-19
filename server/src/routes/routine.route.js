import Router from "express";
import { RoutineController } from "../controller/routine.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const routineRouter = Router();
let routineController = new RoutineController();


routineRouter.get("/", routineController.createChromosome.bind(routineController));