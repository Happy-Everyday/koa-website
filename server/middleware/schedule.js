const schedule = require('node-schedule')

const scheduleFunc = function() {
    var j = schedule.scheduleJob('35 * * * *', function(){
        console.log('Today is recognized by Rebecca Black!');
    })
    return scheduleFunc
}

module.exports = scheduleFunc
