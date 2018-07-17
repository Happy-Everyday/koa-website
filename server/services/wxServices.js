
const axios = require('axios')
const WXBizDataCrypt = require('../../public/js/WXBizDataCrypt')

const appId = ''
const appSecret = ''

const wxDecryptDataService = async (ctx) => {
    var code = ctx.request.body.code
    var iv = ctx.request.body.iv
    var encryptedData = ctx.request.body.encryptedData
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(function (response) {
            var sessionKey = response.data.session_key
            var pc = new WXBizDataCrypt(appId, sessionKey)
            var data = pc.decryptData(encryptedData , iv)
            resolve({
                data: data
            })
        })
        .catch(function (error) {
            reject(error)
        })

    })
}

module.exports = {
    wxDecryptDataService: wxDecryptDataService 
}