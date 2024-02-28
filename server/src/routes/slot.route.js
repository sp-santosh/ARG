import Router from "express";

import { SlotController } from "../controller/slot.controller.js";
import { authenticate } from "../middleware/authentication.js";

export const slotRouter = Router();
const slotController = new SlotController();

slotRouter.get("/", authenticate, slotController.getSlots);
