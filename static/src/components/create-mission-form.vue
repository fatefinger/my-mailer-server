<template>
  <Form ref="missionForm" :model="missionForm" :rules="rulesMission" :label-width="100">
    <FormItem label="发送人邮箱" prop="from">
      <Input v-model="missionForm.from"></Input>
    </FormItem>
    <FormItem label="收件人邮箱" prop="to">
      <Input v-model="missionForm.to"></Input>
    </FormItem>
    <FormItem label="发送时间" prop="sendTime">
      <TimePicker type="time" placeholder="选择发送时间" style="width: 168px" v-model="missionForm.sendTime"></TimePicker>
    </FormItem>
    <FormItem label="抄送" prop="createCC">
      <Input v-model="missionForm.createCC"></Input>
      <Button icon="ios-plus-empty" type="dashed" size="small" @click="ccAdd">添加抄送</Button>
    </FormItem>
    <FormItem prop="cc">
      <Tag v-for="item in missionForm.cc" :key="item" :name="item" closable @on-close="ccRemove">{{item}}</Tag>
    </FormItem>
    <FormItem label="邮件标题" prop="subject">
      <Input v-model="missionForm.subject"></Input>
    </FormItem>
    <!--<FormItem label="邮件正文" prop="text">-->
    <!--<Input v-model="missionForm.text" type="textarea" :rows="4"></Input>-->
    <!--</FormItem>-->
    <FormItem label="html内容" prop="html">
      <quill-editor v-model="missionForm.html">
      </quill-editor>
    </FormItem>
    <FormItem label="上传附件" prop="attachments">
      <Upload
        multiple
        :on-success="handleSuccess"
        action="//localhost:3001/upload/">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
      </Upload>
    </FormItem>
    <FormItem labelPosition="top">
      <Button type="primary" @click="submitHandle" size="large">提 交</Button>
      <Button type="ghost" @click="cancelHandle" size="large">取 消</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import validate from '../rules/index'

  const rules = validate.formValidate

  export default {
    name: 'CreateMissionForm',
    props: {
      newModal: {
        default: true
      }
    },
    data() {
      return {
        missionForm: {
          from: '',
          to: '',
          sendTime: '',
          cc: [],
          subject: '',
          text: '',
          html: '',
          attachments: [],
          createCC: ''
        },
        rulesMission: {
          from: rules.from,
          to: rules.to,
          createCC: rules.createCC,
          sendTime: rules.sendTime
        }
      }
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([
        'createMission'
      ]),
      async submitHandle() {
        try {
          await this.createMission(this.missionForm)
          this.$emit('submitOk')
        } catch (err) {
          this.$Message.error(`createMissionForm submitHandle: ${err} `)
        }
      },
      async cancelHandle () {
        try {
          this.$emit('cancel')
          await this.resetHandle()
        } catch (err) {
          this.$Message.error(`createMissionForm submitHandle: ${err} `)
        }
      },
      async resetHandle() {
        try {
          this.$refs['missionForm'].resetFields()
          this.missionForm = {
            from: '',
            to: '',
            sendTime: '',
            cc: [],
            subject: '',
            text: '',
            html: '',
            attachments: [],
            createCC: ''
          }
        } catch (err) {
          throw new Error(err)
        }
      },
      // 抄送
      // 添加抄送
      ccAdd() {
        try {
          const form = this.missionForm
          if (form.createCC) {
            form.cc.push(form.createCC)
            form.createCC = ''
          }
        } catch (err) {
          throw new Error(err)
        }
      },
      // 删除抄送
      ccRemove(event, email) {
        try {
          const index = this.missionForm.cc.indexOf(email)
          this.missionForm.cc.splice(index, 1)
        } catch (err) {
          throw new Error(err)
        }
      },

      handleSuccess(res, file) {
        try {
          this.missionForm.attachments.push(res.data.filename)
          console.log(this.missionForm.attachments)
        } catch (err) {
          throw new Error(err)
        }
      }
    }
  }
</script>

<style scoped>

</style>
