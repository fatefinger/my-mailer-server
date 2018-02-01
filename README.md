# my-mailer
## 简介
my_mailer是用vue + koa2 + mysql搭建的前后端分离应用，现有的功能主要是作为定时邮件服务器使用。项目主要为一个B/S框架，可以在上面添加自己的个人业务，可以轻易改写为博客、系统后台、个人主页等其他应用。

## 环境搭建
1. 请先前往node.js官网下载8.x.x以上版本的nodejs：[nodejs官方网站](https://nodejs.org/zh-cn/)。
并在本地输入node --version 查看nodejs版本。

```
C:\Users\杨帆>node --version
v8.9.4

C:\Users\杨帆>
```

2. 在本地搭建mysql数据库，并创建数据库my_mailer。
3. 将项目文件解压到本地
## 配置
编辑项目下的config.js文件，根据实际情况修改本地配置。

```
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
        HOST: 'smtp host',
        SSH: false, // use SSL
        USER: 'email',
        PASSWORD: 'password'
    },
    /* 邮件内容配置 */

}

module.exports = exports = config
```
## 安装
在项目目录下执行: npm install   来安装项目依赖

```
C:\Users\杨帆\WebstormProjects\my-mailer-server>npm install
```
## 运行
1. 先执行init目录下的index.js文件来初始化数据库

```
C:\Users\杨帆\WebstormProjects\my-mailer-server>node ./init/index.js
```
2. 再执行app.js文件来启动服务
```
C:\Users\杨帆\WebstormProjects\my-mailer-server>node ./server/app.js
```
3. 登录 http://localhost:3001 即可看到控制台主页
## 开发
如果要在此项目的基础上进行开发，需要安装前端依赖文件。

```
C:\Users\杨帆\WebstormProjects\my-mailer-server\static>npm install
```
## 现有功能
- 定时邮件的建立与发送
- 邮件任务列表的展示
## 将来会做
- 邮件任务删除与编辑
- 邮件任务的统计
- 未完待续。。。
