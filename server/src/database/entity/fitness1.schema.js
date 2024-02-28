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
      nullable: true,
    },
    dnaF: {
      type: "varchar",
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
    dnaSl: {
      type: "varchar",
      nullable: true,
    },
    indicator: {
      type: "int",
      nullable: true,
    },
  },
});
