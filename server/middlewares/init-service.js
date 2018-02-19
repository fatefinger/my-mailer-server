/**
 * Created by 杨帆 on 2018/1/30.
 */
const missionService = require('./../services/mission')
const MissionPool = require('./../utils/mission-pool')


module.exports = {
    async initMissions() {
        console.log(`initMission begin!`)
        let missionList = await missionService.getAllMissions()
        if (missionList.length !== 0) {
            for (let item of missionList) {
                let missionData = {
                    id: item.id,
                    from: item.from,
                    to: item.to,
                    cc: item.cc,
                    subject: item.subject,
                    text: item.text,
                    html: item.html,
                    attachments: item.attachments,
                    sendTime: new Date(item.sendTime)
                }
                MissionPool.createMission(missionData)
                console.log(`任务建立成功`)
                console.log(missionData)
            }
        } else {
            console.log(`任务列表为空,无待执行任务`)
        }
    }
}