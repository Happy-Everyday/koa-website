var callbackSignin = async (ctx) => {
    var userName = ctx.request.body.userName || '',
        userPassword = ctx.request.body.userPassword || ''
    console.log(`signin with userName: ${userName}, userPassword: ${userPassword}`)
    if (userName === 'koa' && userPassword === '12345') {
        ctx.response.body = `<h1>Welcome, ${userName}!</h1>`
    } else {
        ctx.redirect('/')
    }
}

const callbackWxLogin = async ctx => {
    let code = ctx.query.code || ''
    ctx.response.status = 200
    ctx.response.body = {code: 0000, msg: 'success', data: {}}
    console.log(`signin with code: ${code}`)
}

module.exports = [
    {
        method: 'POST',
        path: '/signin',
        cbFnc: callbackSignin
    },
    {
        method: 'GET',
        path: '/api/wxlogin',
        cbFnc: callbackWxLogin
    }
]