import dataSource from "../../datasource.js";
const actualDataRepository = dataSource.getRepository("ActualData");
export class ActualDataRepository {
    async findAll() {
        return await actualDataRepository.find();
    }

    async save(actualData) {
        await actualDataRepository.save(actualData);
    }

}