/**
 * Created by 杨帆 on 2018/1/9.
 */
/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index')

module.exports = router
    .get('/', index)
