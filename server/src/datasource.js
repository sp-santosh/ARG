import { DataSource } from "typeorm";
import { environment } from "./environment.js";

export default new DataSource({
  type: "postgres",
  host: environment.dbHost,
  port: environment.dbPort,
  username: environment.dbUser,
  password: environment.dbPassword,
  database: environment.dbName,
  entities: ["src/database/entity/*.schema.js"],
  migrations: ["src/database/migration/*.js"],
  logging: true,
  synchronize: false,
});
