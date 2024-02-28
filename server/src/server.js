import http from "node:http";
import cors from "cors";
import express from "express";

import { connectToDb } from "./db.js";
import { indexRouter } from "./routes/index.js";
import "./process.js";
import { environment } from "./environment.js";

const app = express();

const server = http.createServer(app);
const PORT = environment.port;

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome!!!",
  });
});

app.use("/api", indexRouter);

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
