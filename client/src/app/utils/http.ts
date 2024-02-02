import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl =
  (process.env.NEXT_PUBLIC_BASEURL as string) ??
  `${process.env.NEXT_PUBLIC_API_URL}`;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    ...headers,
  },
});

export const authHttp = axios.create({
  baseURL: baseUrl,
  headers: {
    ...headers,
  },
});

/**
 * Request interceptor
 * Runs every time before a request is hit
 * Adds Authorization headers
 */
authHttp.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleResponse = (res: AxiosResponse) => res;
const handleError = async (error: any) => {
  return Promise.reject(error);
};

/**
 * Response interceptor
 * Runs every time after a response is received
 * handles error
 */
authHttp.interceptors.response.use(handleResponse, handleError);
