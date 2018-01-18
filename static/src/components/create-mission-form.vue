<template>
  <Form ref="missionForm" :model="missionForm" :rules="rules" :label-width="80">
    <FormItem label="E-mail" prop="mail">
      <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="submitHandle('missionForm')">创 建</Button>
      <Button type="ghost" @click="resetHandle('missionForm')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "create-mission-form",
    data() {
      return {
        missionForm: {
          from: '',
          to: '',
          cc: '',
          subject: '',
          text: '',
          attachments: ''
        },
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
      resetHandle () {
        const tmp = {
          name: '',
            to: '',
            cc: '',
            subject: ''
        }
        this.missionForm = tmp
      }
    }
  }
</script>

<style scoped>

</style>
