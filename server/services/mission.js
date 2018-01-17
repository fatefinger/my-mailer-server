/**
 * Created by 杨帆 on 2018/1/10.
 */

/**
 * 邮件任务操作
 */

const validator = require('validator')
const missionModel = require('./../models/mission')
const missionCode = require('./../code/code')
const path = require('path')

const mission = {

    /**
     * 创建任务
     * @param  {object} mission 任务信息
     * @return {object}      创建结果
     */
    async create(mission) {
        try {
            return await missionModel.create(mission)
        } catch (err) {
            throw new Error(`${__dirname}/${__filename}: ${err}`)
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
                attachments: resultData.attachment,
                sendTime: resultData.send_time,
                createTime: resultData.create_time,
                modifiedTime: resultData.modified_time
            }
        } catch (err) {
            throw new Error(`${__dirname}/${__filename}: ${err}`)
        }

    },

    /**
     * 获取所有任务信息业务操作
     * @returns {Promise<void>}
     */
    async getAllMissions() {
        try {
            let resultData = await missionModel.getAllMissions() || {}
            console.log(resultData)
            return Array.prototype.map.call(resultData, (item) => {
                return {
                    id: item.id,
                    from: item.mail_from,
                    to: item.mail_to,
                    name: item.mail_name,
                    cc: item.cc,
                    subject: item.subject,
                    text: item.text,
                    html: item.html,
                    attachments: item.attachment,
                    sendTime: item.send_time,
                    createTime: item.create_time,
                    modifiedTime: item.modified_time
                }
            })
        } catch (err) {
            throw new Error(`${__dirname}/${__filename}: ${err}`)
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
            throw new Error(`${__dirname}/${__filename}: ${err}`)
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
            return await missionModel.updateMissionById(value, id)
        } catch (err) {
            throw new Error(`${__dirname}/${__filename}: ${err}`)
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
            throw new Error(`${__dirname}/${__filename}: ${err}`)
        }
    }
}

module.exports = mission
