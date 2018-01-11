/**
 * Created by 杨帆 on 2018/1/10.
 */
const dbUtils = require('./../utils/db-util')

const mission = {

    /**
     * 数据库创建任务
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create ( model ) {
        let result = await dbUtils.insertData( 'mission', model )
        return result
    },

    /**
     * 查找一个存在任务的数据
     * @param  {object} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getExistOne(options ) {
        let _sql = `
    SELECT * from mission
      where mail_to="${options.mail_to}" or name="${options.name}"
      limit 1`
        let result = await dbUtils.query( _sql )
        if ( Array.isArray(result) && result.length > 0 ) {
            result = result[0]
        } else {
            result = null
        }
        return result
    }
}


module.exports = mission
