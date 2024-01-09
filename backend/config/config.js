const { config } = require("dotenv");
const { ValidarEntorno } = require("../utils/utils");
config();

module.exports = {
  dbConfig: {
    host:     ValidarEntorno(process.env.APP_ENV) ? process.env.APP_DEV_DB_HOST       :   process.env.APP_PROD_DB_HOST,
    user:     ValidarEntorno(process.env.APP_ENV) ? process.env.APP_DEV_DB_USER       :   process.env.APP_PROD_DB_USER,
    password: ValidarEntorno(process.env.APP_ENV) ? process.env.APP_DEV_DB_PASS       :   process.env.APP_PROD_DB_PASS,
    database: ValidarEntorno(process.env.APP_ENV) ? process.env.APP_DEV_DB_DATABASE   :   process.env.APP_PROD_DB_DATABASE,
    port:     ValidarEntorno(process.env.APP_ENV) ? process.env.APP_DEV_DB_PORT       :   process.env.APP_PROD_DB_PORT,
    env:      ValidarEntorno(process.env.APP_ENV),
  },
  tokenAuth:  ValidarEntorno(process.env.APP_ENV) ? process.env.APP_DEV_TOKEN_AUTH    :   process.env.APP_PROD_TOKEN_AUTH
}