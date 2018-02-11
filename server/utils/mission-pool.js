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

    async cancelMission(data) {
        try {

            let mission = this._getMissionById(id)
        } catch (err) {

        }
    }

    async updateMission(data) {
        try {

        } catch (err) {

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

        }
    }

    /**
     * this.missionNumber update
     * @return {number}
     * @private
     */
    _updateId() {
        return this.missionNumber++
    }
}

module.exports = new MissionPool()