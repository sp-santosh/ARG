import { EntitySchema } from "typeorm";

export const FacultySchema = new EntitySchema({
  name: "Faculty",
  tableName: "faculties",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    className: {
      type: "varchar"
    },
    code: {
      type: "varchar"
    },
    semester: {
      type: "varchar"
    }
  }
});