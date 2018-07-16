const Koa = require('koa')
const app = new Koa()

const path = require('path')
const static = require('koa-static')
const views = require('koa-views')
const cors = require('koa2-cors');

const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const port = 3000
const viewsH = require('../views/index')
const controller = require('./middleware/controller')

app.use(bodyParser())

app.use(static(path.join(__dirname, '../public')))
app.use(views(path.join(__dirname, '../views'), viewsH))

app.use(controller())

app.use(cors({
    origin: "*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(router.routes())

app.listen(3000)
console.log(`app listen at ${port}`)