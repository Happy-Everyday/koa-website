const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = new mongoose.Schema({
    nickName: {
        type: String
    },
    userName: {
        unique: true,
        type: String
    },
    password: String,
    createdTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', function (next) {
    let user = this
    if (this.isNew) {
        this.createdTime = Date.now()
    } else {
        this.updateTime = Date.now()
    }
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) { next(err) }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) { next(err) }
            user.password = hash
            next()
        });
    })
})

userSchema.method('comparePassword', function (password, callback) {
    let user = this
    bcrypt.compare(password, user.password, function (err, isMatched) {
        if (err) { return callback(err, false)}
        callback(null, isMatched)
    });
})

module.exports = userSchema