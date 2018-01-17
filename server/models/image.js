/**
 * Created by 杨帆 on 2018/1/17.
 */

const dbUtils = require('./../utils/db-util')
const format = require('./../utils/format')

const image = {
    /**
     * insert new data into image_info database
     * @param model
     * @returns {Promise<*>}
     */
    async create (model) {
        try {
            let result = {
                mission_id: model.missionId,
                file_name: model.filename,
                file_size: model.filesize || '',
                file_path: model.path,
                create_time: new Date(),
                modified_time: new Date()
            }
            return await dbUtils.insertData('image_info', result)
        } catch (err) {
            throw new Error(err)
        }
    },

    async getImageById (id) {
        try {

        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = image