import dataSource from "../../datasource.js";
const fitness2Repository = dataSource.getRepository("Fitness2");
export class Fitness2Repository {
    async findAll() {
        return await fitness2Repository.find();
    }

    async save(fitness) {
        await fitness2Repository.save(fitness);
    }

    async findByToken(token){
       return await fitness2Repository.findOne({where : {token}});
    }

    async deleteAll(){
        await fitness2Repository.clear();
    }
}