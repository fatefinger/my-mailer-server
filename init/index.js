/**
 * Created by 杨帆 on 2018/1/5.
 */
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
