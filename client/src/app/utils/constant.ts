const config = {
  backend_url: `${process.env.NEXT_PUBLIC_API_URL}`,
};

export const url = {
  login: config.backend_url + "/api/auth/login",
  register: config.backend_url + "/api/auth/register",
  teachers: config.backend_url + "/api/teachers",
};
