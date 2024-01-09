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
    },
    chromo: {
      type: "varchar",
    },
    fitnessHard: {
      type: "int",
    },
    fitnessSoft: {
      type: "int",
    },
  },
});
