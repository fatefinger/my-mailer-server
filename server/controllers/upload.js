/**
 * Created by 杨帆 on 2018/1/29.
 */
const upload = require('./../utils/upload')
const path = require('path')

module.exports = {
    /**
     * 上传图片
     * @param ctx
     * @return {Promise<void>}
     */
    async uploadPicture (ctx) {
        try {
            let result = {
                success: false
            }

            let serverFilePath = path.join( __dirname, '../../static/dist/public' )

            // 上传文件事件
            result = await upload.uploadPicture( ctx, {
                fileType: 'album',
                path: serverFilePath
            })
            ctx.body = result

        } catch (err) {
            throw new Error(err)
        }
    }
}