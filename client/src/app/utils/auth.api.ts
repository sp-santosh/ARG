import axios from "axios";
import { url } from "./constant";
import { authHttp } from "./http";

export const login = async (email: string, password: string) => {
  const res = await axios.post(url.login, {
    email,
    password,
  });

  return res.data;
};

export const fetchTeachers = async () => {
  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/teachers`,
    method: "get",
  });

  return response.data;
};

export const fetchTeachersById = async ({ queryKey }: { queryKey: any }) => {
  const [, data] = queryKey;

  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/teachers/${data.id}`,
    method: "get",
  });

  return response.data;
};

export const fetchSubjects = async () => {
  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/subjects`,
    method: "get",
  });

  return response.data;
};

export const fetchSubjectsById = async ({ queryKey }: { queryKey: any }) => {
  const [, data] = queryKey;

  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/subjects/${data.id}`,
    method: "get",
  });

  return response.data;
};

export const generateRoutineApiCall = async () => {
  const res = await authHttp({
    url: url.generate,
    method: "get",
  });

  return res.data;
};

export const fetchFaculties = async () => {
  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/faculty`,
    method: "get",
  });
  return response.data;
};

export const fetchRoutine = async ({ queryKey }: { queryKey: any }) => {
  const [, data] = queryKey;

  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/generate/view`,
    method: "get",
    params: { faculty: data.faculty },
  });

  return response.data;
};

export const fetchSlots = async () => {
  const response = await authHttp({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/slots`,
    method: "get",
  });
  return response.data;
};
