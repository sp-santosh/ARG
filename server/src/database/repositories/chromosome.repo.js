import dataSource from "../../datasource.js";
const chromosomeRepository = dataSource.getRepository("Chromosome");
export class ChromosomeRepository {

    async findAll() {
        return await chromosomeRepository.createQueryBuilder("chromosome")
        .orderBy("chromosome.fitness", "DESC")
        .getMany();
    }

    async saveChromosome(chromosome) {
        await chromosomeRepository.save(chromosome);
      }
    
    async findById(id){
        return await chromosomeRepository.findOne({ where: { id } });
    }

    async findByFitnessHard(fitnessHard){
        return await chromosomeRepository.findOne({ where: { fitnessHard } });
    }

    async deleteAll(){
        await chromosomeRepository.clear();
    }
}