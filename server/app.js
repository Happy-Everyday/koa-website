const path = require('path')
const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const cors = require('koa2-cors')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')


const app = new Koa()
const { port, dbUrl, corsConfig} = require('./config')
const viewsH = require('../views/index')
const controller = require('./middleware/controller')

const db = require('./db')
db.connect(dbUrl, { useNewUrlParser: true })

app.use(bodyParser())

app.use(static(path.join(__dirname, '../public')))
app.use(views(path.join(__dirname, '../views'), viewsH))

app.use(controller())
app.use(cors(corsConfig))

app.use(router.routes())

app.use(logger())
app.listen(port)
console.log(`.......................`)
console.log(`app listen at ${port}`)
console.log(``)
