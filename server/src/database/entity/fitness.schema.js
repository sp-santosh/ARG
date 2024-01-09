import { EntitySchema } from "typeorm";

export const FitnessSchema = new EntitySchema({
  name: "Fitness",
  tableName: "fitnesses",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    token: {
      type: "int",
    },
    dnaT: {
      type: "varchar",
    },
    dnaS: {
      type: "varchar",
    },
    dnaC: {
      type: "varchar",
    },
  },
});
