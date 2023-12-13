import http from "node:http";

import express from "express";
import { connectToDb } from "./db.js";
import "./process.js";

const app = express();

const server = http.createServer(app);
const PORT = process.env["PORT"];

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome!!!",
  });
});

connectToDb()
  .then(() => {
    console.info("connected to postgres database");
    server.listen(PORT, () => {
      console.info(`http server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
