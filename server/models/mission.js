/**
 * Created by 杨帆 on 2018/1/10.
 */
const dbUtils = require('./../utils/db-util')

const mission = {

    /**
     * 数据库创建任务
     * @param  {object} model 用户数据模型
     * @return {object} result      mysql执行结果
     */
    async create(model) {
        return await dbUtils.insertData('mission_info', model)
    },
    /**
     * 查询所有任务数据
     * @returns {Promise<*>}
     */
    async getAllMissions () {
        let result = await dbUtils.select('mission_info', '*')
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

    /**
     * 通过id获取任务数据
     * @param id
     * @returns {Promise<*>}
     */
    async getMissionById (id) {
        let result = await dbUtils.findDataById('mission_info', id)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

    /**
     * 通过id删除任务数据
     * @param id
     * @returns {Promise<*>}
     */
    async deleteMissionById (id) {
        let result = await dbUtils.deleteDataById('mission_info', id)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

    /**
     * 通过id更新任务数据
     * @param value
     * @param id
     * @returns {Promise<*>}
     */
    async updateMissionById (value, id) {
        let result = await dbUtils.updateData('mission_info', value, id)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    }

}


module.exports = mission
