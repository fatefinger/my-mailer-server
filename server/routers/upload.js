/**
 * Created by 杨帆 on 2018/1/29.
 */
const router = require('koa-router')()
const uploadController = require('./../controllers/upload')

const routers = router
    // .get('/', uploadController.getMissionList)
    // .delete('/mission', missionController.deleteMission)
    .get('/', uploadController.getUploadPicture)
    .post('/', uploadController.uploadPicture)
// .update('/mission', missionController.updateMission)


module.exports = routers
