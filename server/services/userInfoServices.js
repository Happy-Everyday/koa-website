const bcrypt = require('bcrypt')

const User = require('../models/userModel')
const util = require('../util')

const { formatCookie } = require('../util')

const store = require('../lib/store')

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
    let userName = ctx.request.body.userName
    let nickName = ctx.request.body.nickName
    let password = ctx.request.body.userPassword
    let userRePassword = ctx.request.body.userRePassword
    if (password !== userRePassword) {
        return {
            code: '00001',
            msg: 'userRePassword 和 password 不一致!',
            data: 0
        }
    }
    if (userName && password && nickName) {
        let results = await findUserInfo({ userName: userName })
        util.consoleText(`find users list`, results)
        if (results.length > 0) {
            return {
                code: '00002',
                msg: '用户已经存在!',
                data: 0
            }
        } else {
            let newUser = new User({
                userName: userName,
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
    let userName = ctx.request.body.userName
    let password = ctx.request.body.userPassword
    if (userName && password) {
        return new Promise((resolve, reject) => {
            User.findOne({ userName: userName }, function (err, user) {
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
                            let session = {
                                nickName: user.nickName
                            }
                            let sessionId = await store.set(session, user.userName + timeTemp)
                            ctx.cookies.set(
                                'sessionId', sessionId,{
                                    domain:'localhost', // 写cookie所在的域名
                                    path:'/',       // 写cookie所在的路径
                                    maxAge: 7*24*60*60*1000,   // cookie有效时长
                                    expires:new Date('2018-10-08'), // cookie失效时间
                                    httpOnly:false,  // 是否只用于http请求中获取
                                    overwrite:false  // 是否允许重写
                                }
                            )
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

const userSignoutService = async function(ctx) {
    let cookie = formatCookie(ctx.header.cookie)
    let sessionId = cookie.sessionId
    await store.destroy(sessionId)
    await ctx.cookies.set(
        'sessionId', sessionId,{
            domain:'localhost', // 写cookie所在的域名
            path:'/',       // 写cookie所在的路径
            maxAge: -1,   // cookie有效时长
            expires: -1, // cookie失效时间
            httpOnly:false,  // 是否只用于http请求中获取
            overwrite:false  // 是否允许重写
        }
    )
    return {
        code: '000000',
        msg: '登出成功',
        data: 0
    }
}


const userUserListService = async function(ctx) {
    let cookies = formatCookie(ctx.header.cookie)
    let sessionId = cookies.sessionId
    if (!sessionId) {
        return {
            code: '000007',
            msg: '请先登录！',
            data: 0 
        }
    }
    let user = await store.get(sessionId)
    let userList = await findUserInfo({})
    return {
        code: '000000',
        msg: '登出成功',
        data: {
            userList: userList,
            user: user
        }
    }
}


module.exports = {
    store: store,
    userSignupService: userSignupService,
    userSigninService: userSigninService,
    userSignoutService: userSignoutService,
    userUserListService: userUserListService
}