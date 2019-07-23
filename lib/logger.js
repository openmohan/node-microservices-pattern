const { createLogger, format, transports } = require('winston')
const { combine, timestamp, colorize, printf, splat } = format
const level = process.env.LOG_LEVEL || 'debug'
const Util = require('util')

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`
})

const Logger = createLogger({
    level,
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        perf: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    format: combine(timestamp(), colorize(), splat(), customFormat),
    transports: [new transports.Console()],
    exceptionHandlers: [new transports.Console()],
    exitOnError: false
})

const RequestLogger = function(request){
    Logger.debug(`Method: ${request.method} Path: ${request.url.path} Query: ${JSON.stringify(request.query)}`)
    Logger.debug(`Headers: ${JSON.stringify(request.headers)}`)
}

const ResponseLogger = function(request){
    if (request.response) {
        let response
        try {
            response = JSON.stringify(request.response.source)
        } catch (e) {
            response = Util.inspect(request.response.source)
        }
        if (!response) {
            Logger.info(`Response: ${request.response}`)
        } else {
            Logger.info(`Response: ${response} Status: ${request.response.statusCode}`)
        }
    }
}

module.exports = {Logger, RequestLogger, ResponseLogger}
