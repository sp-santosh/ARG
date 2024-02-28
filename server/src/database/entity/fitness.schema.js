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
      nullable: true,
    },
    dnaT: {
      type: "varchar",
      nullable: true,
    },
    dnaS: {
      type: "varchar",
      nullable: true,
    },
    dnaC: {
      type: "varchar",
      nullable: true,
    },
  },
});
