/**
 * Created by 杨帆 on 2018/1/12.
 */
const allConfig = require('/config')
const hostConfig = allConfig.host

const Mailer = function (options) {

    let opt = {
        from: '',
        to: '',
        cc: '',
        // bcc		: ''	//密送
        subject: '',
        text: '',
        html: '',
        attachments: []
    }

    let host = {
        host: hostConfig.HOST,
        secureConnection: hostConfig.SSH, // use SSL
        auth: {
            user: hostConfig.USER,
            pass: hostConfig.PASSWORD
        }
    }




    return new Promise((resolve, reject) => {

    })
}

module.exports = Mailer