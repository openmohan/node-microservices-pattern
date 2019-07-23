'use strict'
const StockAPI = require('../lib/stock')
// const {Logger} = require('../lib/logger')

// const Boom = require('boom')
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
     */
    post: function addStock(request, h) {
        if (request.payload.name == 'mohan') {
            return h.response({
                errorInformation: {
                    errorCode: 1,
                    errorDescription: 'mohan Cannot be accepted for now',
                    extensionList: [{
                        'key': 'rest',
                        'value': 'true'
                    }]
                }
            }).code(400)
        }
        return h.response().code(201)
    },
    /**
     * summary: List stocks
     * description: 
     * parameters: name
     * produces: 
     * responses: 200
     */

    get: async function listStock(request, h) {
        try{
            const response = await StockAPI.getAllSymbols()
            let responseArray = response.data.map((stock)=> {
                return {
                    name: stock.name,
                    region: stock.region,
                    isEnabled: stock.isEnabled,
                    audit:{
                        'created_at': '2017-07-21T17:32:28Z',
                        'updated_at': '2017-07-21T17:32:28Z'
                    }
                }
            })
            return h.response(responseArray).code(200)
        }catch(e){
            if(e.code == 2){
                return h.response(e.message).code(500)
            }
            return h.response(e.message).code(400)
        }
    }
}