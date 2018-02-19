/**
 * Created by 杨帆 on 2018/1/11.
 */
const missionService = require('./../services/mission')
const missionCode = require('./../code/code')
const path = require('path')
const check = require('./../utils/check')
const MissionPool = require('./../utils/mission-pool')

module.exports = {

    /**
     * get all missions
     * @param ctx
     * @returns {Promise<void>}
     */
    async getMissionList(ctx) {
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
    async createMission(ctx) {
        try {
            let formData = ctx.request.body
            let result = {
                success: false,
                message: '',
                data: null
            }
            // 检查输入数据
            try {
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
            // 将任务信息插入数据库
            let tmp = await missionService.create(missionData)
            console.log(tmp)
            missionData.id = tmp.id

            // 创建发送任务
            // let mission = new Mailer()
            // await mission.init(missionData)
            // await mission.send()
            if (await MissionPool.createMission(missionData)) {
                // 返回数据
                result.success = true
                result.message = missionCode.UPDATE_MISSION_SUCCESS
                result.data = tmp
                ctx.body = result
            }
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * remove mission
     * @param ctx
     * @return {Promise<void>}
     */
    async removeMission(ctx) {
        try {
            let id = ctx.request.param.id
            let result = {
                success: false,
                message: '',
                data: null
            }
            let tmp = await missionService.deleteMissionById(id)
            MissionPool.cancelMission(id)
            result.success = true
            result.message = missionCode.REMOVE_MISSION_SUCCESS
            result.data = tmp
            ctx.body = result
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * update mission
     * @param ctx
     * @return {Promise<void>}
     */
    async updateMission(ctx) {
        try {
            let formData = ctx.request.body
            let result = {
                success: false,
                message: '',
                data: null
            }
            // 检查输入数据
            try {
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

            let tmp = await missionService.updateMissionById(missionData, formData.id)
            MissionPool.updateMission(tmp.id, missionData)
            result.success = true
            result.message = missionCode.UPDATE_MISSION_SUCCESS
            result.data = tmp
            ctx.body = result
        } catch (err) {
            throw new Error(err)
        }
    }

}
