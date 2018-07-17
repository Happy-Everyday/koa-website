const mongoose = require('mongoose')
const util = require('./util')

mongoose.connection.on('error', function (err) {
    util.consoleText('Mongoose connection', `has err: ${err}!`)
});
mongoose.connection.on('connected', function () {
    util.consoleText('Mongoose connection', 'success!')
});
mongoose.connection.on('disconnected', () => {
    util.consoleText('Mongoose connection', 'disconnected!')
})

module.exports = mongoose