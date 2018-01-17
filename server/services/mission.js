/**
 * Created by 杨帆 on 2018/1/10.
 */

/**
 * 邮件任务操作
 */

const validator = require('validator')
const missionModel = require('./../models/mission')
const missionCode = require('./../code/code')
const Format = require('./../utils/format')


const mission = {

    /**
     * 创建任务
     * @param  {object} mission 任务信息
     * @return {object}      创建结果
     */
    async create(mission) {
        try {
            console.log(Array.isArray(mission.cc))
            let result = {
                mail_from: mission.from,
                mail_to: mission.to,
                mail_name: mission.name,
                cc: Array.isArray(mission.cc)? mission.cc.join(',') : null,
                subject: mission.subject,
                text: mission.text,
                html: mission.html,
                send_time: mission.sendTime,
                attachment: Format.objectArrayToString(mission.attachments),
                create_time: new Date(),
                modified_time: new Date()
            }
            console.log(result)
            return await missionModel.create(result)
        } catch (err) {
            throw new Error(err)
        }
    },

    /**
     * 根据id查找任务业务操作
     * @param  {string} id 任务id
     * @return {object|null}     查找结果
     */
    async getMissionById(id) {
        try {
            let resultData = await missionModel.getMissionById(id) || {}
            return {
                id: resultData.id,
                from: resultData.mail_from,
                to: resultData.mail_to,
                name: resultData.mail_name,
                cc: resultData.cc,
                subject: resultData.subject,
                text: resultData.text,
                html: resultData.html,
                attachments: resultData.attachment ? null : Format.stringToObjectArray.call(this, resultData.attachment),
                sendTime: resultData.send_time,
                createTime: resultData.create_time,
                modifiedTime: resultData.modified_time
            }
        } catch (err) {
            throw new Error(err)
        }

    },

    /**
     * 获取所有任务信息业务操作
     * @returns {Promise<void>}
     */
    async getAllMissions() {
        try {
            let resultData = await missionModel.getAllMissions() || {}
            return Array.prototype.map.call(resultData, (item) => {
                return {
                    id: item.id,
                    from: item.mail_from,
                    to: item.mail_to,
                    name: item.mail_name,
                    cc: item.cc === null? null : item.cc.split(',')　,
                    subject: item.subject,
                    text: item.text,
                    html: item.html,
                    attachments: item.attachment === null? null : Format.stringToObjectArray(item.attachment),
                    sendTime: item.send_time,
                    createTime: item.create_time,
                    modifiedTime: item.modified_time
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    },

    /**
     * 根据给定id删除任务业务操作
     * @param id
     * @returns {Promise<*>}
     */
    async deleteMissionById(id) {
        try {
            return await missionModel.deleteMissionById(id)
        } catch (err) {
            throw new Error(err)
        }
    },

    /**
     * 根据给定id更新任务数据业务操作
     * @param value
     * @param id
     * @returns {Promise<*>}
     */
    async updateMissionById(value, id) {
        try {
            let result = {
                id: value.id,
                from: value.mail_from,
                to: value.mail_to,
                name: value.mail_name,
                cc: value.cc.split(','),
                subject: value.subject,
                text: value.text,
                html: value.html,
                attachments: Format.stringToObjectArray(value.attachment),
                sendTime: value.send_time,
                createTime: new Date(),
                modifiedTime: value.modified_time
            }
            return await missionModel.updateMissionById(result, id)
        } catch (err) {
            throw new Error(err)
        }
    },

    /**
     * 检验新建任务数据
     * @param  {object} mission 新建任务数据
     * @return {object}          校验结果
     */
    validatorCreateMission(mission) {
        try {
            let result = {
                success: false,
                message: '',
            }

            if (!validator.isEmail(mission.from)) {
                result.message = missionCode.ERROR_EMAIL
                return result
            }

            result.success = true

            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = mission
