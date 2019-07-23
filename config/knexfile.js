'use strict'

const migrationsDirectory = './migrations'
const seedsDirectory = './seeds'


const Config = require('../lib/config')

module.exports = {
    client: 'mysql',
    version: '5.7',
    connection: {
        host: Config.DB_HOST,
        user: Config.DB_USER,
        password: Config.DB_PASSWORD,
        database: Config.DB_NAME
    },
    migrations: {
        directory: migrationsDirectory,
        tableName: 'migration'
    },
    seeds: {
        directory: seedsDirectory,
        loadExtensions: ['.js']
    }
}