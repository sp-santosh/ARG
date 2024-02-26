import dataSource from "../../datasource.js";
const actualDataRepository = dataSource.getRepository("ActualData");
export class ActualDataRepository {
  async findAll() {
    return actualDataRepository.find();
  }

  async findByFaculty(faculty) {
    return actualDataRepository.find({
      where: { faculty },
      order: { day: "ASC" },
    });
  }

  async save(actualData) {
    await actualDataRepository.save(actualData);
  }
}
