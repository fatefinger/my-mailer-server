/**
 * Created by 杨帆 on 2018/1/17.
 */
const validator = require('validator')

const check = {
    /**
     * check mission form data
     * @param form
     */
    checkMissionInput(form) {
        if (!validator.isEmail(form.from)) throw new TypeError(`from is not email`)
        if (!validator.isEmail(form.to)) throw new TypeError(`to is not email`)
        if ((!Array.isArray(form.cc)) && form.cc !== undefined) throw new TypeError(`cc is not Array`)
        if (typeof form.subject !== 'string') throw new TypeError(`subject is not string`)
        if (typeof form.text !== 'string') throw new TypeError(`text is not string`)
        if (typeof form.html !== 'string') throw new TypeError(`html is not string`)
        if (!Array.isArray(form.attachments) && form.attachments !== undefined && form.attachments !== []) {
            throw new TypeError(`attachment is not array`)
        } else {
            for (let item of form.attachments) {
                if (typeof item !== 'object') throw new TypeError('attachments item is not object')
            }
        }
    }
}

module.exports = check