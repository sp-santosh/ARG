import { EntitySchema } from "typeorm";


export const ChromosomeSchema = new EntitySchema({
  name: "Chromosome",
  tableName: "chromosomes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    fitness: {
      type: "int",
      nullable: true,
    },
    chromo: {
      type: "varchar",
      nullable: true,
    },
    fitnessHard: {
      type: "int",
      nullable: true,
    },
    fitnessSoft: {
      type: "int",
      nullable: true,
    },
  },
});
