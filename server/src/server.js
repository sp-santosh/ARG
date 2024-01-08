import http from "node:http";
import cors from "cors";
import express from "express";
import bcrypt from "bcrypt";
import { connectToDb } from "./db.js";
import { UserRepository } from "./database/repositories/user.repo.js";
import "./process.js";

const app = express();

const server = http.createServer(app);
const PORT = process.env["PORT"];

app.use(express.json());
app.use(cors());
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome!!!",
  });
});

app.post("/api/register/", async (req, res, next) => {
  try {
    const payload = req.body;
    console.log({ payload });

    await new UserRepository().saveUser(
      payload.userName,
      payload.email.toLowerCase(),
      payload.password
    );
    res.status(200).json({
      message: "User Created Successfully!!!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRepository = new UserRepository();

    // Find the user by the provided username
    const user = await userRepository.findUserByEmail(email.toLowerCase());

    if (user) {
      // Compare the provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(password, user.password); // Assuming the field is named 'password'
      if (validPassword) {
        // Password matches, proceed with login
        res.status(200).json({ message: "Login successful!" });
      } else {
        // Password does not match
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      // User not found
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred during the login process." });
  }
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
