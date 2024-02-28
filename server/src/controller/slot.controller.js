import { SlotRepository } from "../database/repositories/slot.repo.js";

export class SlotController {
  async getSlots(req, res) {
    try {
      const slots = await new SlotRepository().findSlots();
      res.status(200).json(slots);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
