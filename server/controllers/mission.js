/**
 * Created by 杨帆 on 2018/1/11.
 */
module.exports = {


    async getMissionList (ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null
        }


    },

    /**
     * 获取任务列表
     * @param   {object} ctx 上下文对象
     */
    async getMission( ctx ) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null
        }

        let validateResult = missionService.validatorSignUp( formData )

        if ( validateResult.success === false ) {
            result = validateResult
            ctx.body = result
            return
        }

        let existOne  = await userInfoService.getExistOne(formData)
        console.log( existOne )

        if ( existOne  ) {
            if ( existOne .name === formData.userName ) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST
                ctx.body = result
                return
            }
            if ( existOne .email === formData.email ) {
                result.message = userCode.FAIL_EMAIL_IS_EXIST
                ctx.body = result
                return
            }
        }


        let userResult = await userInfoService.create({
            email: formData.email,
            password: formData.password,
            name: formData.userName,
            create_time: new Date().getTime(),
            level: 1,
        })

        console.log( userResult )

        if ( userResult && userResult.insertId * 1 > 0) {
            result.success = true
        } else {
            result.message = userCode.ERROR_SYS
        }

        ctx.body = result
    }

}
