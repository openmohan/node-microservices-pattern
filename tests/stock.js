const test = require('ava')
const Hapi = require('hapi')
const HapiOpenAPI = require('hapi-openapi')
const {Logger} = require('../lib/logger')
const Path = require('path')
const Sinon = require('sinon')
const MockGen = require('./utils/mockgen')
const StockAPI = require('../lib/stock')

let sandbox

test.beforeEach(async () => {
    sandbox = Sinon.createSandbox()
})

test.afterEach(async () => {
    sandbox.restore()
})

test('run for the first time', t => {
    t.pass()
})

test('run asyn test', async t => {
    let p = new Promise(function(resolve,reject){
        (function(){
            setTimeout(function(){
                resolve('done')  
            },1)
        })(resolve, reject)
    })

    let result = await p
    t.is(result, 'done')
})

test('test post stock api', async t => {
    try{
        const server = new Hapi.Server()
        await server.register({
            plugin: HapiOpenAPI,
            options: {
                api: Path.resolve(__dirname, '../api.yaml'),
                handlers: Path.resolve(__dirname, '../handlers'),
                outputvalidation: true
            }
        })

        const requests = new Promise(function(resolve, reject){
            MockGen().requests({
                path: '/v2/stock',
                operation: 'post'
            }, (err, mock) => {
                return err? reject(err): resolve(mock)
            })
        })

        const mockData = await requests
        
        t.pass(mockData['/stock'])
        t.pass(mockData['/stock'].request)
        let mock = mockData['/stock']

        const options = {
            method: 'post',
            url: '/v2' + mock.request.path
        }

        if(mock.request.body){
            options.payload = mock.request.body
        }

        const response = await server.inject(options)
        t.is(response.statusCode, 201, 'Ok response status')

        options.payload.name = 'mohan'
        const response2 = await server.inject(options)
        t.is(response2.statusCode, 400)
        
        await server.stop()
    }catch(error){
        Logger.error(`testing error ${error}`)
        t.fail()
    }
})

test('get stocks from source api', async t => {
    try{
        const server = new Hapi.Server()
        await server.register({
            plugin: HapiOpenAPI,
            options: {
                api: Path.resolve(__dirname, '../api.yaml'),
                handlers: Path.resolve(__dirname, '../handlers'),
                outputvalidation: true
            }
        })
        const requests = new Promise(function(resolve, reject){
            MockGen().requests({
                path: '/v2/stock',
                operation: 'get'
            }, (err, mock) => {
                return err? reject(err): resolve(mock)
            })
        })
        const mockData = await requests
        
        t.pass(mockData['/stock'])
        t.pass(mockData['/stock'].request)
        let mock = mockData['/stock']

        const options = {
            method: 'get',
            url: '/v2' + mock.request.path
        }

        if(mock.request.body){
            options.payload = mock.request.body
        }

        sandbox.stub(StockAPI, 'getAllSymbols').resolves({data:[
            {
                'name': ' datAeneMmd .anrsLlil',
                'region': 'US',
                'isEnabled': true
            }
        ]})

        const response = await server.inject(options)
        t.is(response.statusCode, 200, 'got response status')
        t.is(response.payload, JSON.stringify([{
            'name': ' datAeneMmd .anrsLlil',
            'region': 'US',
            'isEnabled': true,
            'audit': {
                'created_at': '2017-07-21T17:32:28Z',
                'updated_at': '2017-07-21T17:32:28Z'
            }
        }]),'response is fine')

        await server.stop()
    }catch(e){
        Logger.error(`testing error ${e}`)
        t.fail()
    }
})