let reported_stock = [
    {
        name: 'myReportedStock',
        exchange: 'MRS',
        region: 'IN'
    },
    {
        name: 'myReportedStock2',
        exchange: 'MRP',
        region: 'US'
    }
]

exports.seed = (knex) => {
    return knex('reported_stock').insert(
        reported_stock
    )
} 