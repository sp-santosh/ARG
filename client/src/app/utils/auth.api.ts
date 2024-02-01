import axios from "axios";
import { url } from "./constant";

export const login = async (email: string, password: string) => {
  const res = await axios.post(url.login, {
    email,
    password,
  });

  return res.data;
};

export const fetchTeachers = async () => {
  const response = await axios.get(
    "http://127.0.0.1:80/api/teachers",
  );
  return response.data;
};
