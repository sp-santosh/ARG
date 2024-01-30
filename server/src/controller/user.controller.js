import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { environment } from "../environment.js";

import { UserRepository } from "../database/repositories/user.repo.js";

export class UserController {
  async registerUser(req, res) {
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
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const userRepository = new UserRepository();

      // Find the user by the provided username
      const user = await userRepository.findUserByEmail(email.toLowerCase());

      if (user) {
        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password); // Assuming the field is named 'password'
        if (validPassword) {
          const token = jwt.sign({ email: user.email }, environment.jwtSecret, {
            expiresIn: "1h",
          });
          // Password matches, proceed with login
          res.status(200).json({ message: "Login successful!", token });
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
  }
}
