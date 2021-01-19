require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DEV_DATABASE_URL",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "PRODUCTION_DATABASE_URL",
    dialect: "mysql",
  },
};
