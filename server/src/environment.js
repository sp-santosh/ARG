export const environment = {
  port: process.env["PORT"] || 8000,
  dbHost: process.env["DB_HOST"] || "localhost",
  dbPort: process.env["DB_PORT"] || 5432,
  dbName: process.env["DB_NAME"] || "arg",
  dbUser: process.env["DB_USER"] || "arg_user",
  dbPassword: process.env["DB_PASSWORD"] || "QX!p6?0v485U",
  jwtSecret: process.env["JWT_SECRET"] || "kjcsevkbleuobaljnflk134jh",
};
