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


module.exports = [
    {
        method: 'POST',
        path: '/signin',
        cbFnc: callbackSignin
    }
]