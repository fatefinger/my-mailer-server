/**
 * Created by 杨帆 on 2018/1/8.
 */
const config = {
    /* 服务端口 */
    port: 3001,
    /* 数据库配置 */
    database: {
        DATABASE: 'my_mailer',
        USERNAME: 'root',
        PASSWORD: 'root',
        PORT: '3306',
        HOST: 'localhost'
    },
    /* 邮件服务器配置 */
    host: {
        HOST: 'smtp.kedacom.com',
        SSH: false, // use SSL
        USER: 'yangfan@kedacom.com',
        PASSWORD: 'keda%yf'
    },
    /* 邮件内容配置 */
//    图片存储路径
    pathPicture: './pic'

}

module.exports = exports = config