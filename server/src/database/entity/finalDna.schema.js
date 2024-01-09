import { EntitySchema } from "typeorm";

export const FinalDnaSchema = new EntitySchema({
  name: "FinalDna",
  tableName: "final_dna",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    slot: {
      type: "varchar",
    },
    teacher: {
      type: "varchar",
    },
    subject: {
      type: "varchar",
    },
    faculty: {
      type: "varchar",
    },
    token: {
      type: "int",
    },
  },
});
