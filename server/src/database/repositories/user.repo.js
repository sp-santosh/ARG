import dataSource from "../../datasource.js";
const userRepository = dataSource.getRepository("User");
import bcrypt from "bcrypt";
export class UserRepository {
  async saveUser(username, email, password) {
    const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds
    await userRepository.save({
      username,
      email,
      password: passwordHash,
    });
  }
  // get user
  async getUser(email) {
    return userRepository.findOneBy({ email });
  }
  // update user by email
  async updateUser(email, data) {
    return userRepository.update({ email }, data);
  }
  async findUserByEmail(email) {
    return userRepository.findOneBy({ email });
  }
}
