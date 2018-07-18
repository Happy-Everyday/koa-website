const userInfoServices = require('../services/userInfoServices')

const callbackUserSignup = async ctx => {
     let result = await userInfoServices.userSignupService(ctx)
     ctx.redirect('/')
     if (result && result.code !== '000000') {
        console.log(result)
     }
}

const callbackUserSignin = async ctx => {
    let result = await userInfoServices.userSigninService(ctx)
    ctx.redirect('/')
    if (result && result.code !== '000000') {
         console.log(result)
     }
}

module.exports = [
    {
        method: 'POST',
        path: '/user/signup',
        cbFnc: callbackUserSignup
    },
    {
        method: 'POST',
        path: '/user/signin',
        cbFnc: callbackUserSignin
    }
]