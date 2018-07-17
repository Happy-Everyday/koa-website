const wxServices = require('../services/wxServices')

const callbackWxDecryptData = async ctx => {
   ctx.body = await wxServices.wxDecryptDataService(ctx)
}

module.exports = [
    {
        method: 'POST',
        path: '/api/wxlogin',
        cbFnc: callbackWxDecryptData
    }
]