/**
 * Created by 杨帆 on 2018/1/8.
 */
const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')

const config = require('./../config')
const routers = require('./routers/index')


const app = new Koa()


// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, './../static/dist')
))


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
