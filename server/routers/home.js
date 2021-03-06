const store = require('../lib/store')

const { formatCookie } = require('../util')

const callbackHome = async ctx => {
    let cookie = formatCookie(ctx.header.cookie)
    let sessionId = cookie.sessionId
    let sessionUser = null
    if (sessionId) {
        sessionUser = await store.get(sessionId)
    }
    await ctx.render('home', {
        title: "website",
        name: "World",
        user: sessionUser
    })
}

module.exports = [
    {
        method: 'GET',
        path: '/',
        cbFnc: callbackHome
    }
]