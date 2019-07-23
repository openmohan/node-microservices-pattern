'use strict'
var Mockgen = require('./mockgen.js')
/**
 * Operations on /stock
 */
module.exports = {
    /**
     * summary: Add a new Stock to the store
     * description: 
     * parameters: body
     * produces: 
     * responses: 400
     * operationId: addStock
     */
    post: {
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/stock',
                operation: 'post',
                response: '400'
            }, callback)
        }
    },
    /**
     * summary: List stocks
     * description: 
     * parameters: name
     * produces: 
     * responses: 200
     * operationId: listStock
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/stock',
                operation: 'get',
                response: '200'
            }, callback)
        }
    }
}
