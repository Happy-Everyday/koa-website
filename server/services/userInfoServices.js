const bcrypt = require('bcrypt')

const User = require('../models/userModel')
const util = require('../util')

const Store = require('../lib/store')
const store = new Store()

const saltRounds = 10

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

const getSession = function (nickName) {
    let timeTemp = new Date().getTime()
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                reject(err)
            } else {
                bcrypt.hash(`${nickName}${timeTemp}`, salt, function (err, sessionId) {
                    if (err) { reject(err) }
                    resolve(sessionId)
                });
            }
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
    let cookie = ctx.cookies || {}
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
                    user.comparePassword(password, async function (err, isMatched) {
                        if (err) {
                            reject(err)
                        } else if (isMatched) {
                            console.log('Password is matched!')
                            let timeTemp = new Date().getTime()
                            let session = await getSession(nickName)
                            let sessionId = await store.set(session, nickName + timeTemp)
                            ctx.cookies.set(
                                'sessionId', sessionId,{
                                    domain:'localhost', // 写cookie所在的域名
                                    path:'/',       // 写cookie所在的路径
                                    maxAge: 2*60*60*1000,   // cookie有效时长
                                    expires:new Date('2018-10-08'), // cookie失效时间
                                    httpOnly:false,  // 是否只用于http请求中获取
                                    overwrite:false  // 是否允许重写
                                }
                            );
                            resolve({
                                code: '000000',
                                msg: '登录成功！',
                                data: {
                                    sessionId: sessionId 
                                }
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
    store: store,
    userSignupService: userSignupService,
    userSigninService: userSigninService
}