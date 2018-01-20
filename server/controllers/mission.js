/**
 * Created by 杨帆 on 2018/1/11.
 */
const missionService = require('./../services/mission')
const missionCode = require('./../code/code')
const path = require('path')
const Mailer = require('./../utils/mailer/mailer')
const check = require('./../utils/check')

module.exports = {

    /**
     * get all missions
     * @param ctx
     * @returns {Promise<void>}
     */
    async getMissionList (ctx) {
        try {
            let result = {
                success: false,
                message: '',
                data: null
            }
            let missions = await missionService.getAllMissions()
            result.success = true
            result.message = missionCode.GET_MISSION_SUCCESS
            result.data = missions
            ctx.body = result
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * create new mission
     * @param ctx
     * @return {Promise<void>}
     */
    async createMission (ctx) {
        try {
            let formData = ctx.request.body
            let result = {
                success: false,
                message: '',
                data: null
            }
            // 检查输入数据
            try{
                check.checkMissionInput(formData)
            } catch (err) {
                result.message = missionCode.ERROR_MISSION_INPUT
                ctx.body = result
            }

            let missionData = {
                from: formData.from,
                to: formData.to,
                cc: formData.cc,
                subject: formData.subject,
                text: formData.text,
                html: formData.html,
                attachments: formData.attachments,
                sendTime: new Date(formData.sendTime)
            }
            // 创建发送任务
            let mission = new Mailer()
            await mission.init(missionData)
            await mission.send()
            // 将任务信息插入数据库
            let tmp = await missionService.create(missionData)
            // 返回数据
            result.success = true
            result.message = missionCode.CREATE_MISSION_SUCCESS
            result.data = tmp
            ctx.body = result
        } catch (err) {
            throw new Error(err)
        }
    }

}
