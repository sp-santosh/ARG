import Router from "express";
import { RoutineController } from "../controller/routine.controller.js";
import { RoutineViewController } from "../controller/routineView.controller.js";

import { authenticate } from "../middleware/authentication.js";

export const routineRouter = Router();
let routineController = new RoutineController();
let routineViewController = new RoutineViewController();

routineRouter.get("/view", routineViewController.getActualData);

routineRouter.get(
  "/",
  routineController.createChromosome.bind(routineController)
);
