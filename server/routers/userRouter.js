const userInfoServices = require('../services/userInfoServices')

const callbackUserSignup = async ctx => {
     ctx.body = await userInfoServices.userSignupService(ctx)
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
        cbFnc: callbackUserSignup
    }
]