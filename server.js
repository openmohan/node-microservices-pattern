'use strict'

const Hapi = require('hapi')
const HapiOpenAPI = require('hapi-openapi')
const Path = require('path')
const {Logger, RequestLogger, ResponseLogger} = require('./lib/logger')
const  StockAPI = require('./lib/stock')
const Config = require('./lib/config')
const Migrator = require('./lib/migrator')
const KnexConfig = require('./config/knexfile')

const migrate = async () => {
    Config.RUN_MIGRATIONS? await Migrator(KnexConfig) : {}
}

const init = async function() {
    const server = new Hapi.Server({
        port:8067,
        routes: {
            validate: {
                failAction: (request, h, err) => {
                    throw err
                }
            }
        }
    })

    await server.register({
        plugin: HapiOpenAPI,
        options: {
            api: Path.resolve('./api.yaml'),
            handlers: Path.resolve('./handlers'),
            outputvalidation: true
        }
    })

    await server.ext([
        {
            type: 'onPreHandler',
            method: (request, h) => {
                // create logger
                RequestLogger(request)
                return h.continue
            }
        },
        {
            type: 'onPreResponse',
            method: (request, h) => {
                if (!request.response.isBoom) {
                    // create logger
                    ResponseLogger(request.response)
                } else {
                    const error = request.response
                    ResponseLogger(request.response)
                    error.message = {
                        errorInformation: {
                            errorCode: error.statusCode,
                            errorDescription: error.message,
                            extensionList:[{
                                key: '',
                                value: ''
                            }]
                        }
                    },
                    error.reformat()
                }
                return h.continue
            }
        }
    ])

    StockAPI.instantiate(Config.STOCK_API_URL, Config.STOCK_API_TOKEN)

    await server.start()

    return server
}

init().then(async (server) => {
    
    await migrate()
    server.plugins.openapi.setHost(server.info.host + ':' + server.info.port)

    Logger.info(`Server running on ${server.info.host}:${server.info.port}`)
    Logger.silly('does not print')
    Logger.warn('this will')
})

