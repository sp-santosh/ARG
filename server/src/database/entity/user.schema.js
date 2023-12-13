import { Entity, PrimaryGeneratedColumn, Column, EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
  },
});
