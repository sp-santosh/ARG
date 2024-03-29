import dataSource from "../../datasource.js";
const fitness1Repository = dataSource.getRepository("Fitness1");
export class Fitness1Repository {
    async findAll() {
        return await fitness1Repository.find();
    }

    async save(fitness) {
        await fitness1Repository.save(fitness);
    }

    async findByToken(token){
       return await fitness1Repository.findOne({where : {token}});
    }

    async deleteAll(){
        await fitness1Repository.clear();
    }
}