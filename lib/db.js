'use strict'

const Knex = require('knex')
const StockErr = require('./errors')

class Database{
    constructor(){
        this._knex = null
    }
    connect(kf){
        if(this._knex){
            throw new StockErr('3','database already configured')
        }
        this._knex = Knex(kf)
    }   
    async disconnect(){
        if(this._knex){
            try{
                await this._knex.destroy()
                this._knex = null
            }catch(e){
                throw e
            }
        }
    }
}

module.exports = Database