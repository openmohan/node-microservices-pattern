const SwagMock = require('swagmock')
const Path = require('path')


module.exports = () => {
    return SwagMock(Path.resolve(__dirname, '../../api.yaml'))
}