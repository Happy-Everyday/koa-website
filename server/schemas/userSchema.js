const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName: String
})

module.exports = userSchema