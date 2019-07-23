const request = require('axios')
const {Logger} = require('./logger')
const {StockErr} = require('./errors')

class StockAPI{
    constructor(url, token){
        this.apiInstance = request.create({
            baseURL: url,
            timeout: 1000,
            headers: {},
            params: {'token': token}
        })
    }

    instantiate(url, token){
        this._token = token
        this.apiInstance = request.create({
            baseURL: url,
            timeout: 20000,
            headers: {}
        })
    }

    async getAllSymbols(){
        try{
            if(this.apiInstance){
                const response =  await this.apiInstance({
                    url: '/ref-data/symbols',
                    method: 'get',
                    params: {token: this._token}
                })
                return response
            }else{
                throw new StockErr('2','stock api not intialiased')
            }
        }catch(e){
            Logger.debug(e)
            throw e
        }
    }
}

module.exports = new StockAPI()