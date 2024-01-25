const config = {
  backend_url: "http://127.0.0.1:80",
};

export const url = {
  login: config.backend_url + "/api/auth/login",
  register: config.backend_url + "/api/auth/register",
  teachers: config.backend_url + "/api/teachers",
};
