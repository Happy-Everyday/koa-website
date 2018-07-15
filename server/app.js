const Koa = require('koa')
const app = new Koa()

const path = require('path')
const static = require('koa-static')
const views = require('koa-views')

const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const port = 3000
const viewsH = require('../views/index')

app.use(bodyParser())

app.use(static(path.join(__dirname, '../public')))
app.use(views(path.join(__dirname, '../views'), viewsH))


router.get('/', async ctx => {
	await ctx.render('home')
})

router.post('/signin', async (ctx, next) => {
	var name = ctx.request.body.name || '',
			password = ctx.request.body.password || ''
	console.log(`signin with name: ${name}, password: ${password}`)
	if (name === 'koa' && password === '12345') {
			ctx.response.body = `<h1>Welcome, ${name}!</h1>`
	} else {
			ctx.response.body = `<h1>Login failed!</h1>
			<p><a href="/">Try again</a></p>`
	}
})

app.use(router.routes())

app.listen(3000)
console.log(`app listen at ${port}`)