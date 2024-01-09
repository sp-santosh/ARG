import { EntitySchema } from "typeorm";

export const TeacherSchema = new EntitySchema({
  name: "Teacher",
  tableName: "teachers",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    shortName: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
    phoneNumber: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    specialization: {
      type: "varchar",
    },
    code: {
      type: "varchar",
    },
    sunStartTime: {
      type: "time",
    },
    sunEndTime: {
      type: "time",
    },
    monStartTime: {
      type: "time",
    },
    monEndTime: {
      type: "time",
    },
    tueStartTime: {
      type: "time",
    },
    tueEndTime: {
      type: "time",
    },
    wedStartTime: {
      type: "time",
    },
    wedEndTime: {
      type: "time",
    },
    thurStartTime: {
      type: "time",
    },
    thurEndTime: {
      type: "time",
    },
    friStartTime: {
      type: "time",
    },
    friEndTime: {
      type: "time",
    },
  },
});
