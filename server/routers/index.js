/**
 * Created by 杨帆 on 2018/1/9.
 */
const router = require('koa-router')()

const home = require('./home')
// const error = require('./error')

router.use('/', home.routes(), home.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router
