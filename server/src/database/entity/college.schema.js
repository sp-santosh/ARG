import { EntitySchema } from "typeorm";

export const CollegeSchema = new EntitySchema({
  name: "College",
  tableName: "colleges",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    faculty: {
      type: "varchar"
    },
    semester: {
      type: "int"
    },
    teacher: {
      type: "varchar"
    },
    shortName: {
      type: "varchar"
    },
    subject: {
      type: "varchar"
    },
    type: {
      type: "varchar"
    },
    classesPerWeek: {
      type: "int"
    },
    code: {
      type: "varchar"
    },
    teacherCode: {
      type: "varchar"
    },
    subjectCode: {
      type: "varchar"
    },
    sunStartTime: {
      type: "time"
    },
    sunEndTime: {
      type: "time"
    },
    monStartTime: {
      type: "time"
    },
    monEndTime: {
      type: "time"
    },
    tueStartTime: {
      type: "time"
    },
    tueEndTime: {
      type: "time"
    },
    wedStartTime: {
      type: "time"
    },
    wedEndTime: {
      type: "time"
    },
    thurStartTime: {
      type: "time"
    },
    thurEndTime: {
      type: "time"
    },
    friStartTime: {
      type: "time"
    },
    friEndTime: {
      type: "time"
    }
  }
});