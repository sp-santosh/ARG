import dataSource from "../../datasource.js";
const finalDnaRepository = dataSource.getRepository("FinalDna");
export class FinalDnaRepository {
    async findAll() {
        return await finalDnaRepository.find();
    }

    async save(finalDna) {
        await finalDnaRepository.save(finalDna);
    }

    async findByToken(token){
        await finalDnaRepository.findOne({where : {token}});
    }
}