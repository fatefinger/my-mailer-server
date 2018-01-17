/**
 * Created by 杨帆 on 2018/1/12.
 */
const allConfig = require('./../../../config')
const MailPic = require('./mail-pic')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const MailOptions = require('./mail-options')
const hostConfig = allConfig.host

class Mailer {
    constructor() {
        // email option
        this.options = new MailOptions()
        // stmp server option
        this.smtpOptions = {
            host: hostConfig.HOST,
            secureConnection: hostConfig.SSH, // use SSL
            auth: {
                user: hostConfig.USER,
                pass: hostConfig.PASSWORD
            }
        }
        //    time to send
        this.time = {
            hour: 0,
            minute: 0,
            second: 0
        }
        //    schedule rule
        this.rule = new schedule.RecurrenceRule()
        this.filelist = []
    }

    /**
     * set mail options
     * @param {object}opt
     * {string} from: sender email eg：'YangFan<yangfan@kedacom.com>' or 'yangfan@kedacom.com'
     * {string} to: addressee email eg: 'YangFan<15601752941@163.com>' or '15601752941@163.com'
     *                                   even if you want to send multi emails just like that: 'yangfan@kedacom.com, 15601752941@163.com'
     * {Array} bcc: cc list eg: ['yangfan532357944@gmail.com', '532357944@qq.com']
     *              use object list: [{
     *                                  name: 'YangFan',
     *                                  address: 'yangfan532357944@gmail.com'
     *                                }, ...]
     * {string} subject: email title eg: '这是一封测试邮件'
     * {string} text: email text eg: '这是邮件正文'
     * {string} date: send time eg: '14:22:12'
     * @returns {Promise<*>}
     */
    async init(opt) {
        try {
            this.options = new MailOptions()
            await this.options.setFrom(opt.from)
            await this.options.setTo(opt.to)
            await this.options.setFrom(opt.cc)
            await this.options.setSubject(opt.subject)
            await this.options.setText(opt.text)
            await this._parseDateToTime(opt.date)
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * parse date to this.time
     * @param {string}date
     * @returns {Promise<void>}
     * @private
     */
    async _parseDateToTime(date) {
        try {
            let temp = new Date(date)
            this.time = {
                hour: temp.getHours(),
                minute: temp.getMinutes(),
                second: temp.getSeconds()
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }

    /**
     * insert images to attachments
     * @param {Array}filelist
     * @returns {Promise<void>}
     */
    async insertImage(filelist) {
        try {
            await this.options.insertImagesToMail(filelist)
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * insert html template to html
     * @param {string}template
     * @returns {Promise<void>}
     */
    async insertHtml(template) {
        try {
            await this.options.insertHtmlText(template)
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * create timing mission
     * @param {function}cb
     * @returns {Promise<void>}
     * @private
     */
    async _createTimingMission(cb) {
        try {
            return schedule.scheduleJob(this.rule, cb)
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * send mail
     * @returns {Promise<void>}
     */
    async send() {
        try {
            let transporter = await nodemailer.createTransport(this.smtpOptions)
            console.log('transporter init!')
            await this._createTimingMission(() => {
                transporter.sendMail(this.options, (err, msg) => {
                    if (err) {
                        throw new Error(err)
                    } else {
                        console.log(msg)
                    }
                })
            })
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = Mailer