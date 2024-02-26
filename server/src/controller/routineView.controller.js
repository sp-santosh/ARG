import { ActualDataRepository } from "../database/repositories/actualData.repo.js";

export class RoutineViewController {
  async getActualData(req, res) {
    try {
      const routineData = await new ActualDataRepository().findByFaculty(
        req.query.faculty
      );
      res.status(200).json(routineData);
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: err.message });
    }
  }
}
