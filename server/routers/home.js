
const callbackHome = async ctx => {
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