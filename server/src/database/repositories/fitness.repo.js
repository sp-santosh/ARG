import dataSource from "../../datasource.js";
const fitnessRepository = dataSource.getRepository("Fitness");
export class FitnessRepository {
    async findAll() {
        return await fitnessRepository.find();
    }

    async save(fitness) {
        await fitnessRepository.save(fitness);
    }

    async findByToken(token){
        return await fitnessRepository.findOne({where : {token}});
    }

    async deleteAll(){
        await fitnessRepository.clear();
    }
}