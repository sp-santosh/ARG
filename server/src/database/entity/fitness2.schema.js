import { EntitySchema } from "typeorm";

export const Fitness2Schema = new EntitySchema({
  name: "Fitness2",
  tableName: "fitness2",
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
