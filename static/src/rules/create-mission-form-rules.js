/**
 * Created by 杨帆 on 2018/1/19.
 */
const formRules = {
  from: [{required: true, message: '发件人邮箱不能为空', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}],
  to: [{required: true, message: '收件人邮箱不能为空', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}],
  createCC: {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
  sendTime: [{required: true, type: 'date', message: '请选择发送时间', trigger: 'change'}]
}

export default formRules
