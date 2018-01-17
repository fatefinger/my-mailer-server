/**
 * Created by 杨帆 on 2018/1/15.
 */
const MailPic = require('mail-pic')

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
     * @param {string}address eg：'YangFan<yangfan@kedacom.com>' or 'yangfan@kedacom.com' or 'YangFan<yangfan@kedacom.com>, yangfan@kedacom.com'
     * @returns {Promise<*>}
     */
    async setTo(address) {
        return this.to = address || ''
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
     * @param {array}filelist eg: ['123.png', 'example.png', ...]
     * @returns {Promise<void>}
     */
    async insertImagesToMail(filelist) {
        try {
            for (let item of filelist) {
                let pic = new MailPic(item)
                let {htmlItem, attachmentItem} = pic.create()
                this.html.concat(htmlItem)
                this.attachments.push(attachmentItem)
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
     * @param strtmp
     * @returns {Promise<string>}
     */
    async insertHtmlText(strtmp) {
        try {
            return this.html.concat(strtmp)
        } catch (err) {
            throw new Error(err)
        }
    }

}

module.exports = MailOptions