/**
 * Created by 杨帆 on 2018/1/10.
 */

/**
* 邮件任务操作
*/

const validator = require('validator')
const missionModel = require('./../models/mission')
const missionCode = require('./../code/code')

const mission = {

    /**
     * 创建任务
     * @param  {object} mission 任务信息
     * @return {object}      创建结果
     */
    async create (mission) {
        return await missionModel.create(mission)
    },

    /**
     * 根据id查找任务业务操作
     * @param  {string} id 任务id
     * @return {object|null}     查找结果
     */
    async getMissionById (id) {

        let resultData = await missionModel.getMissionById( id ) || {}
        return {
            id: resultData.id,
            from: resultData.mail_from,
            to: resultData.mail_to,
            name: resultData.mail_name,
            cc: resultData.cc,
            subject: resultData.subject,
            text: resultData.text,
            html: resultData.html,
            attachments: resultData.attachment,
            sendTime: resultData.send_time,
            createTime: resultData.create_time,
            modifiedTime: resultData.modified_time
        }
    },


    /**
     * 检验新建任务数据
     * @param  {object} mission 新建任务数据
     * @return {object}          校验结果
     */
    validatorCreateMission (mission) {
        let result = {
            success: false,
            message: '',
        }

        if ( !validator.isEmail( mission.from ) ) {
            result.message = missionCode.ERROR_EMAIL
            return result
        }

        result.success = true

        return result
    }

}

module.exports = mission
