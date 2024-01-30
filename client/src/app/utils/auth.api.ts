import axios from "axios";
import { url } from "./constant";

export const login = async (email: string, password: string) => {
  const res = await axios.post(url.login, {
    email,
    password,
  });

  return res.data;
};
