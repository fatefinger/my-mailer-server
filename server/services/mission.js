/**
 * Created by 杨帆 on 2018/1/10.
 */

/**
* 邮件任务操作
*/

const validator = require('validator')
const missionModel = require('./../models/mission')

const mission = {

    /**
     * 创建任务
     * @param  {object} mission 任务信息
     * @return {object}      创建结果
     */
    async create( mission ) {
        let result = await missionModel.create(mission)
        return result
    },

    /**
     * 查找存在任务信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    async getExistOne( formData ) {
        let resultData = await missionModel.getExistOne({
            'to': formData.email,
            'name': formData.userName
        })
        return resultData
    },

    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName( userName ) {

        let resultData = await userModel.getUserInfoByUserName( userName ) || {}
        let userInfo = {
            // id: resultData.id,
            email: resultData.email,
            userName: resultData.name,
            detailInfo: resultData.detail_info,
            createTime: resultData.create_time
        }
        return userInfo
    },


    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp( userInfo ) {
        let result = {
            success: false,
            message: '',
        }

        if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
            result.message = userCode.ERROR_USER_NAME
            return result
        }
        if ( !validator.isEmail( userInfo.email ) ) {
            result.message = userCode.ERROR_EMAIL
            return result
        }
        if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
            result.message = userCode.ERROR_PASSWORD
            return result
        }
        if ( userInfo.password !== userInfo.confirmPassword ) {
            result.message = userCode.ERROR_PASSWORD_CONFORM
            return result
        }

        result.success = true

        return result
    }

}

module.exports = user
