<template>
  <Form ref="missionForm" :model="missionForm" :rules="rulesMission" :label-width="100">
    <FormItem label="发送人邮箱" prop="from">
      <Input v-model="missionForm.from"></Input>
    </FormItem>
    <FormItem label="收件人邮箱" prop="to">
      <Input v-model="missionForm.to"></Input>
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
    <FormItem label="邮件正文" prop="text">
      <Input v-model="missionForm.text" type="textarea" :rows="4"></Input>
    </FormItem>
    <FormItem label="html内容" prop="html">
      <quill-editor v-model="missionForm.html">
      </quill-editor>
    </FormItem>
    <FormItem label="上传附件" prop="attachments">
      <Upload
        multiple
        action="//jsonplaceholder.typicode.com/posts/">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
      </Upload>
    </FormItem>
  </Form>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import validate from '../rules/index'
  const rules = validate.formValidate

  export default {
    name: 'CreateMissionForm',
    data () {
      return {
        missionForm: {
          from: '',
          to: '',
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
      async submitHandle (data) {
        try {
          await this.createMission(data)
        } catch (err) {
          this.$Message.error(`createMissionForm submitHandle: ${err} `)
        }
      },
      async resetHandle () {
        try {
          this.missionForm = {
            from: '',
            to: '',
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
      async ccAdd () {
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
      async ccRemove (event, email) {
        try {
          const index = this.missionForm.cc.indexOf(email)
          this.missionForm.cc.splice(index, 1)
        } catch (err) {
          throw new Error(err)
        }
      }

    }
  }
</script>

<style scoped>

</style>
