const RC = require('rc')('EXCHANGE', require('../config/default.json'))

module.exports = {
    API_PORT: RC.API_PORT,
    STOCK_API_TOKEN: RC.STOCK_API_TOKEN,
    STOCK_API_URL: RC.STOCK_API_URL,
    RUN_MIGRATIONS: RC.RUN_MIGRATIONS,
    DB_HOST: RC.DB_HOST,
    DB_NAME: RC.DB_NAME,
    DB_USER: RC.DB_USER,
    DB_PASSWORD: RC.DB_PASSWORD
}