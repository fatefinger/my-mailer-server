/**
 * Created by 杨帆 on 2018/1/11.
 */
const missionService = require('./../services/mission')
const missionCode = require('./../code/code')
const path = require('path')
const Mailer = require('./../utils/mailer/mailer')

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

    async createMission (ctx) {
        try {
            let formData = ctx.request.body
            let result = {
                success: false,
                message: '',
                data: null
            }
            console.log(formData)






        } catch (err) {
            throw new Error(err)
        }
    }

}
