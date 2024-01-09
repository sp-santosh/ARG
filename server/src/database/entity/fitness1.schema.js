import { EntitySchema } from "typeorm";

export const Fitness1Schema = new EntitySchema({
  name: "Fitness1",
  tableName: "fitness1",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    token: {
      type: "int",
    },
    dnaF: {
      type: "varchar",
    },
    dnaT: {
      type: "varchar",
    },
    dnaS: {
      type: "varchar",
    },
    dnaSl: {
      type: "varchar",
    },
    indicator: {
      type: "int",
    },
  },
});
