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
    "https://dbv5756l-80.use2.devtunnels.ms/api/teachers"
  );
  return response.data;
};

export const fetchTeachersById = async ({ queryKey }: { queryKey: any }) => {
  const [, data] = queryKey;
  const response = await axios.get(
    `https://dbv5756l-80.use2.devtunnels.ms/api/teachers/${data.id}`
  );

  return response.data;
};
