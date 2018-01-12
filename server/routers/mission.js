/**
 * Created by 杨帆 on 2018/1/11.
 */
const router = require('koa-router')()
const missionController = require('./../controllers/mission')

const routers = router
    .get('/mission', missionController.getMission)
    .delete('/mission', missionController.deleteMission)
    .post('/mission', missionController.createMission)
    .update('/mission', missionController.updateMission)


module.exports = routers


