/**
 * Created by 杨帆 on 2018/1/9.
 */
const router = require('koa-router')()

const mission = require('./mission')
const upload = require('./upload')
// const error = require('./error')

router.use('/mission', mission.routes(), mission.allowedMethods())
router.use('/upload', upload.routes(), upload.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router
