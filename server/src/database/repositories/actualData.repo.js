import dataSource from "../../datasource.js";
const actualDataRepository = dataSource.getRepository("ActualData");
export class ActualDataRepository {
  async findAll() {
    return await actualDataRepository.find();
  }

  async findByFaculty(faculty) {
    return await actualDataRepository.find({
      where: { faculty },
      order: { day: "ASC" },
    });
  }

  async save(actualData) {
    await actualDataRepository.save(actualData);
  }
}
