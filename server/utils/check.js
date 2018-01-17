/**
 * Created by 杨帆 on 2018/1/17.
 */
const validator = require('validator')

const check = {
    checkMissionInput (form) {
        let result = true
        if (!validator.isEmail(form.from)) {
            result = false
            console.log(`from:${form.from}`)
        }
        if (!validator.isEmail(form.to)) {
            result = false
            console.log(`to:${form.to}`)
        }
        if (typeof form.name !== 'string') {
            result = false
            console.log(`name: ${form.name}`)
        }
        if ((!Array.isArray(form.cc)) && form.cc !== undefined) {
            result = false
            console.log(`cc: ${form.cc}`)
        }
        if (typeof form.subject !== 'string') {
            result = false
            console.log(`subject: ${form.subject}`)
        }
        if (typeof form.text !== 'string') {
            console.log(`text: ${form.text}`)
            result = false
        }
        if (typeof form.html !== 'string') {
            console.log(`html: ${form.html}`)
            result = false
        }
        if (!Array.isArray(form.attachments) && form.attachments !== undefined) {
            console.log(`attachments : ${form.attachments}`)
            result = false
        }
        return result

    }
}

module.exports = check