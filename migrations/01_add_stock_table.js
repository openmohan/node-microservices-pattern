'use strict'

exports.up = (knex) => {
    return knex.schema.hasTable('stock').then(function(exists){
        if(!exists){
            return knex.schema.createTable('reported_stock', (t) => {
                t.string('exchange', 3).primary().notNullable()
                t.string('name', 128).defaultTo(null).nullable()
                t.string('region',30).notNullable().defaultTo(null)
            })
        }
    })
}

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('reported_stock')
}