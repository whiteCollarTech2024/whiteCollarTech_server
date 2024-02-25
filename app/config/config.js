module.exports = {
  port: process.env.PORT || 8080,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    connectionString: `postgres://${process.env.DB_USER}:${
      process.env.DB_PASSWORD
    }@${process.env.DB_HOST || "localhost"}:5432/${process.env.DB_NAME}`,
  },
};
