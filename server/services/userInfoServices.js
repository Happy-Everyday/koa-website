const User = require('../models/userModel')
const util =require('../util')

const findUserInfo = function (options) {
    return new Promise((resolve, reject) => {
        User.find(options ,(err, res) => {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

const userSignupService = async function (ctx) {
    let nickName = ctx.query.nickName
    if (nickName) {
        let results = await findUserInfo({nickName: nickName})
        util.consoleText(`find users list`, results)
        if (results.length > 0) {
            return {
                code: '00002',
                msg: '用户已经存在!',
                data: 0
            }
        } else {
            let newUser = new User({
                nickName: nickName
            })
            return new Promise((resolve, reject) => {
                newUser.save((err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            code: 00000,
                            msg: '用户保存成功!',
                            data: result
                        })
                    }
                })
            })
        }
    } else {
        return {
            code: '00001',
            msg: 'nickName 不能为空!',
            data: 0
        }
    }
}

module.exports = {
    userSignupService: userSignupService
}