/**
 * Created by 杨帆 on 2018/1/10.
 */
const dbUtils = require('./../utils/db-util')
const path = require('path')

const mission = {

    /**
     * 数据库创建任务
     * @param  {object} model 用户数据模型
     * @return {object} result      mysql执行结果
     */
    async create(model) {
        try {
            return await dbUtils.insertData('mission_info', model)
        } catch (err) {
            throw new Error(`${__dirname} ${__filename} : ${err}`)
        }
    },
    /**
     * 查询所有任务数据
     * @returns {Promise<*>}
     */
    async getAllMissions () {
        try {
            let result = await dbUtils.selectAll('mission_info')
            console.log(result)
            if (!(Array.isArray(result) && result.length > 0)) {
                result = null
            }
            return result
        } catch (err) {
            throw new Error(`${__dirname} ${__filename} : ${err}`)
        }
    },

    /**
     * 通过id获取任务数据
     * @param id
     * @returns {Promise<*>}
     */
    async getMissionById (id) {
        try {
            let result = await dbUtils.findDataById('mission_info', id)
            if (Array.isArray(result) && result.length > 0) {
                result = result[0]
            } else {
                result = null
            }
            return result
        } catch (err) {
            throw new Error(`${__dirname} ${__filename} : ${err}`)
        }
    },

    /**
     * 通过id删除任务数据
     * @param id
     * @returns {Promise<*>}
     */
    async deleteMissionById (id) {
        try {
            let result = await dbUtils.deleteDataById('mission_info', id)
            if (Array.isArray(result) && result.length > 0) {
                result = result[0]
            } else {
                result = null
            }
            return result
        } catch (err) {
            throw new Error(`${__dirname} ${__filename} : ${err}`)
        }

    },

    /**
     * 通过id更新任务数据
     * @param value
     * @param id
     * @returns {Promise<*>}
     */
    async updateMissionById (value, id) {
        try {
            let result = await dbUtils.updateData('mission_info', value, id)
            if (Array.isArray(result) && result.length > 0) {
                result = result[0]
            } else {
                result = null
            }
            return result
        } catch (err) {
            throw new Error()
        }
    }

}


module.exports = mission
