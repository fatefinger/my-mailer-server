/**
 * Created by 杨帆 on 2018/1/10.
 */
const Mock = require('mockjs')

const mission = {
  'array|20-40': [{
    '_id|+1': 1000,
    'name': '@cname',
    'to': '@email',
    'cc|0-4': ['@email'],
    'subject': '@csentence',
    'text': '@cparagraph',
    'sendTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'attachments': []
  }]
}

export const missionList = Mock.mock(mission).array
