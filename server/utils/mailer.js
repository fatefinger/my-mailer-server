/**
 * Created by 杨帆 on 2018/1/12.
 */
const allConfig = require('./../../config')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const hostConfig = allConfig.host
const path = require('path')

const pictureFilePath = path.resolve('./static/dist/public') // 图片路径地址
/*
* 图片附件生成
* */
class  MailPic{
    constructor (filename) {
        this.path = `${pictureFilePath}/${filename}`
        this.html = `<img src="cid:${filename}" />`
        this.attachment = {
            filename: filename,
            path: `${pictureFilePath}/${filename}`,
            cid: `${filename}`
        }
    }
    create () {
        return {
            html: this.html,
            attachment: this.attachment
        }
    }
}
/*
* mail options 类
* */
class MailOptions {
    constructor() {
        this.from = ''
        this.to = ''
        // this.cc = []
        this.bcc = []	//密送
        this.subject = ''
        this.text = ''
        this.html = ''
        this.attachments = []
    }

    /**
     * set from address
     * @param {string}address eg：'YangFan<yangfan@kedacom.com>' or 'yangfan@kedacom.com'
     * @returns {Promise<*>}
     */
    async setFrom(address) {
        return this.from = address || ''
    }

    /**
     * set to address
     * @param {string}to eg：'YangFan<yangfan@kedacom.com>' or 'yangfan@kedacom.com' or 'YangFan<yangfan@kedacom.com>, yangfan@kedacom.com'
     * @returns {Promise<*>}
     */
    async setTo(to) {
        return this.to = to || ''
    }

    /**
     * set bcc
     * @param {Array}addressList eg: ['YangFan<yangfan@kedacom.com>', {
     *                                                                  name: 'YangFan',
     *                                                                  address: 'yangfan@kedacom.com'
     *                                                                }, ...]
     * @returns {Promise<*>}
     */
    async setCC(addressList) {
        if (Array.isArray(addressList)) {
            return this.bcc = addressList
        } else {
            throw new Error(`TypeError: ${addressList}`)
        }
    }

    /**
     * set subject
     * @param {string}subject
     * @returns {Promise<*>}
     */
    async setSubject(subject) {
        return this.subject = subject
    }

    /**
     * set text
     * @param str
     * @returns {Promise<*>}
     */
    async setText (str) {
        return this.text = str
    }

    /**
     * insert images to mail
     * {string} html: email html text eg: "<h1>这是邮件题目</h1><p>这是邮件第一行</p><p>这是邮件第二行</p><img src='cid:yangfan@kedacom.com' />"
     * {Array} attachments: attachment list eg: [{
     *                                              filename: 'image.png',
     *                                              path: '/path/to/file',
     *                                              cid: 'yangfan@kedacom.com' // same cid value as in the html img src
     *                                          }, ...]
     * @param {array}filelist eg: ['123.png', 'example.png', ...]  图片文件列表
     * @returns {Promise<void>}
     */
    insertImagesToMail(filelist) {
        try {
            for (let item of filelist) {
                let pic = new MailPic(item)
                let tmp = pic.create()
                this.html = this.html.concat(tmp.html)
                this.attachments.push(tmp.attachment)
                console.log(this.html)
                console.log(this.attachments)
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * insert string template to html
     * {string} html: email html text eg: "<h1>这是邮件题目</h1><p>这是邮件第一行</p><p>这是邮件第二行</p><img src='cid:yangfan@kedacom.com' />"
     * {Array} attachments: attachment list eg: [{
     *                                              filename: 'image.png',
     *                                              path: '/path/to/file',
     *                                              cid: 'yangfan@kedacom.com' // same cid value as in the html img src
     *                                          }, ...]
     * @param strtmp               待插入html文本
     * @returns {Promise<string>}
     */
    async insertHtmlText(strtmp) {
        try {
            return  this.html += strtmp
        } catch (err) {
            throw new Error(err)
        }
    }

}

/*
* 邮件类，创建邮件对象，带有发送方法
* */
class Mailer {
    constructor() {
        // email option
        this.options = {}
        // stmp server option
        this.smtpOptions = {
            transport: "SMTP",
            host: hostConfig.HOST,
            secureConnection: hostConfig.SSH, // use SSL
            port: 25,
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
            await this.options.setCC(opt.cc)
            await this.options.setSubject(opt.subject)
            await this.options.setText(opt.text)
            await this.options.insertHtmlText(opt.html)
            await this.options.insertImagesToMail(opt.attachments)
            await this._parseDateToTime(opt.sendTime)

            console.log(this.options)
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
            this.rule.hour = this.time.hour
            this.rule.minute = this.time.minute
            this.rule.second = this.time.second
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
            let transporter = nodemailer.createTransport(this.smtpOptions)
            await this._createTimingMission(() => {
                transporter.sendMail(this.options, (err, msg) => {
                    if (err) {
                        console.log(this.options)
                        throw new Error(err)
                    } else {
                        console.log(msg)
                        console.log('邮件发送成功！')
                    }
                })
            })
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = Mailer