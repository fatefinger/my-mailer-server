/**
 * Created by 杨帆 on 2018/1/15.
 */
const allConfig = require('/config')
const picDirname = allConfig.picDirname

class  MailPic{
    constructor (filename) {
        this.path = picDirname
        this.html = `<img src="cid:${this.path}/${filename}" />`
        this.attachment = {
            filename: filename,
            path: `${this.path}/${filename}`,
            cid: `${this.path}/${filename}`
        }
    }

    async create () {
        return {
            html: this.html,
            attachment: this.attachment
        }
    }

}

module.exports = MailPic
