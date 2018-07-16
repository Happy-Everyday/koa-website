
const callbackHome = async ctx => {
    await ctx.render('home', {
        title: "XYTang",
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