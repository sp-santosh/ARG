import { EntitySchema } from "typeorm";

export const SubjectSchema = new EntitySchema({
  name: "Subject",
  tableName: "subjects",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    },
    faculty: {
      type: "varchar"
    },
    semester: {
      type: "int"
    },
    code: {
      type: "varchar"
    }
  }
});