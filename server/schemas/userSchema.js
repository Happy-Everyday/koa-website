const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName: String,
    password: String
})

module.exports = userSchema