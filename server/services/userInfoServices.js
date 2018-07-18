const User = require('../models/userModel')
const util = require('../util')

const findUserInfo = function (options) {
    return new Promise((resolve, reject) => {
        User.find(options, (err, res) => {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

const userSignupService = async function (ctx) {
    let nickName = ctx.request.body.userName
    let password = ctx.request.body.userPassword
    if (nickName && password) {
        let results = await findUserInfo({ nickName: nickName })
        util.consoleText(`find users list`, results)
        if (results.length > 0) {
            return {
                code: '00002',
                msg: '用户已经存在!',
                data: 0
            }
        } else {
            let newUser = new User({
                nickName: nickName,
                password: password
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
            msg: 'nickName 和 password 不能为空!',
            data: 0
        }
    }
}


const userSigninService = async function (ctx) {
    let nickName = ctx.request.body.userName
    let password = ctx.request.body.userPassword
    if (nickName && password) {
        return new Promise((resolve, reject) => {
            User.findOne({ nickName: nickName }, function (err, user) {
                if (err) { reject(err) }
                if (!user) {
                    resolve({
                        code: '000003',
                        msg: '用户不存在!',
                        data: 0
                    })
                } else {
                    user.comparePassword(password, function (err, isMatched) {
                        if ( err ) { 
                            reject(err)
                        } else if (isMatched) {
                            console.log('Password is matched!')
                            resolve({
                                code: '000000',
                                msg: '登录成功！',
                                data: 0
                            })
                        } else {
                            console.log('Password is not matched!')
                            resolve({
                                code: '000004',
                                msg: '密码错误！',
                                data: 0
                            })
                        }
                    })
                }
            })
        })
    } else {
        return {
            code: '000001',
            msg: 'nickName 和 password 不能为空!',
            data: 0
        }
    }
}


module.exports = {
    userSignupService: userSignupService,
    userSigninService: userSigninService
}