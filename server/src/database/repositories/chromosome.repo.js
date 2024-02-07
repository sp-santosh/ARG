import dataSource from "../../datasource.js";
const chromosomeRepository = dataSource.getRepository("Chromosome");
export class ChromosomeRepository {

    async findAll() {
        return await chromosomeRepository.find();
    }

    async saveChromosome(chromosome) {
        await chromosomeRepository.save(chromosome);
      }
}