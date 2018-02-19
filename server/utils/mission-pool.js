/**
 * Created by 杨帆 on 2018/2/11.
 */
const Mailer = require('./mailer')

class MissionPool {
    constructor() {
        this.timingMissionList = [] // timing mission list
    }

    /**
     * create new Mission
     * @param {object}data : Mailer Options
     * @return {Promise<boolean>}
     */
    async createMission(data) {
        try {
            let mission = new Mailer()
            await mission.init(data)
            await mission.send()
            let timingMission = {
                id: data.id,
                data: await mission.getTimingMission()
            }
            this.timingMissionList.push(timingMission)
            return true
        } catch (err) {
            console.log('create Mission Error')
            throw new Error(err)
        }
    }

    /**
     * 取消任务
     * @param id
     * @return {Promise<void>}
     */
    async cancelMission(id) {
        try {
            let mission = this._getMissionById(id).data
            mission.cancel()
            console.log(`定时任务取消：${id}`)
        } catch (err) {
            console.log(`定时任务取消出错：${id}`)
            throw new Error(err)
        }
    }

    /**
     * 更新任务
     * @param id
     * @param data
     * @return {Promise<void>}
     */
    async updateMission(id, data) {
        try {
            await this.cancelMission(id)
            await this.createMission(data)
        } catch (err) {
            console.log('创建新任务出错')
            console.log(data)
            throw new Error(err)
        }
    }

    /**
     * get mission by id
     * @param id
     * @private
     */
    _getMissionById(id) {
        try {
            return this.timingMissionList.filter((item) => {
                return (item.id === id )
            })
        } catch (err) {
            console.log('获取任务出错')
            console.log(id)
            throw new Error(err)
        }
    }
}

module.exports = new MissionPool()