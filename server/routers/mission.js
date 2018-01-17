/**
 * Created by 杨帆 on 2018/1/11.
 */
const router = require('koa-router')()
const missionController = require('./../controllers/mission')

const routers = router
    .get('/', missionController.getMissionList)
    // .delete('/mission', missionController.deleteMission)
    .post('/', missionController.createMission)
    // .update('/mission', missionController.updateMission)


module.exports = routers


