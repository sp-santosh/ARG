import { EntitySchema } from "typeorm";

export const StudentSchema = new EntitySchema({
  name: "Student",
  tableName: "students",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    faculty: {
      type: "varchar",
    },
    semester: {
      type: "int",
    },
    noOfStudents: {
      type: "int",
    },
  },
});
