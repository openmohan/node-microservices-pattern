'use strict'

const Knex = require('knex') 

const migrate = (kf)=>{
    const knex = Knex(kf)
    knex.migrate.latest().then(()=>
        knex.seed.run()
    ).then(()=>{
        knex.destroy()
    })
}

module.exports = migrate