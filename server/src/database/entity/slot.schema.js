import { EntitySchema } from "typeorm";

export const SlotSchema = new EntitySchema({
  name: "Slot",
  tableName: "slots",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    startTime: {
      type: "time"
    },
    endTime: {
      type: "time"
    },
    code: {
      type: "varchar"
    }
  }
});