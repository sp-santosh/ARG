import { EntitySchema } from "typeorm";

export const DaySchema = new EntitySchema({
  name: "Day",
  tableName: "days",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    day: {
      type: "varchar",
    },
    code: {
      type: "varchar",
    },
  },
});
