import { EntitySchema } from "typeorm";

export const ActualDataSchema = new EntitySchema({
  name: "ActualData",
  tableName: "actual_data",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    startTime: {
      type: "time",
    },
    endTime: {
      type: "time",
    },
    teacherName: {
      type: "varchar",
    },
    subjectName: {
      type: "varchar",
    },
    faculty: {
      type: "varchar",
    },
    token: {
      type: "int",
    },
    day: {
      type: "varchar",
    },
  },
});