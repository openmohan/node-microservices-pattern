const test = require('ava')
const StockAPI = require('../../lib/stock')
const request = require('axios')
const nock = require('nock')

test.beforeEach(async () => {

})

test.afterEach(async () => {
    nock.cleanAll()
})

test('check if stock api is working properly', async t =>{
    try{
        nock('http://url')
            .get('/ref-data/symbols?token=token')
            .reply(200, {
                data: [
                    {name:'mohan','region':'US','isEnabled':'true'}
                ]
            }
            )
        StockAPI.instantiate('http://url','token')
        const axiosInstant = request.create({
            baseURL: 'url',
            timeout: 20000,
            headers: {}
        })
        t.is(JSON.stringify(StockAPI.apiInstance),JSON.stringify(axiosInstant),'both instances are same')
        t.is(StockAPI._token, 'token','token set properly')
        let response = await StockAPI.getAllSymbols()
        t.log(response.data)
        t.is(response.data.data[0].name,'mohan')
    }catch(e){
        t.log(e)
        t.fail()
    }
})