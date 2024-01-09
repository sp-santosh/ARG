import { EntitySchema } from "typeorm";

export const RoutineSchema = new EntitySchema({
  name: "Routine",
  tableName: "routines",
  columns: {
    // Assuming you want at least an ID column for the entity
    id: {
      primary: true,
      type: "int",
      generated: true
    }
    // Add other columns as needed
  },
  // If there are any relations or other entity options, they would be specified here
});