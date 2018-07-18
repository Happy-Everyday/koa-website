const { store} = require('../services/userInfoServices')

const { formatCookie } = require('../lib/format')


const callbackHome = async ctx => {
	let cookie = formatCookie(ctx.header.cookie)
	let sessionId = cookie.sessionId
	console.log('sessionId: ' + sessionId)
	if (sessionId) {
		let session = await store.get(sessionId)
		console.log('session: ' + session)
	}
    await ctx.render('home', {
        title: "website",
        name: "World"
      })
}

module.exports = [
    {
        method: 'GET',
        path: '/',
        cbFnc: callbackHome
    }
]