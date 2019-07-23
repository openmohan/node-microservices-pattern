class StockError extends Error{
    constructor(code, params){
        super(...params)
        this.code = code
    }
}

module.exports = StockError