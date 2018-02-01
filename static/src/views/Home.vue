/**
* Created by 杨帆 on 2018/1/10.
*/
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">my-mailer</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              任务列表
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>任务列表</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <Row type="flex" justify="end" align="middle">
            <Col span="4">
            <Button type="primary" shape="circle" icon="plus" @click="createMission">创建任务</Button>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" style="margin-top: 10px">
            <Col span="24">
            <Table highlight-row ref="currentRowTable" :columns="tableHead" :data="missions"></Table>
            </Col>
          </Row>
        </Card>
      </Content>
      <Footer class="layout-footer-center"></Footer>
    </Layout>
    <Modal
      :width="850"
      v-model="modalVisiable"
      title="新建任务"
      :mask-closable="false"
      :closable="false"
      :footerHide="true">
      <create-mission-form @submitOk="close" @cancel="close"></create-mission-form>
    </Modal>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import CreateMissionForm from '../components/create-mission-form'

  export default {
    components: {CreateMissionForm},
    name: 'Home',

    data () {
      return {
        host: window.location.host,
        tableHead: [{
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '收件人地址',
          key: 'to'
        }, {
          title: '抄送',
          key: 'cc',
          render: (h, params) => {
            let arr = []
            let cc = params.row.cc
            for (let i = 0; i < cc.length; i++) {
              arr.push(h('p', cc[i]))
            }
            return h('div', arr)
          }
        }, {
          title: '标题',
          key: 'subject'
        }, {
          title: '发送时间',
          key: 'sendTime',
          render: (h, params) => {
            let time = new Date(params.row.sendTime)
            return h('p', time.toLocaleTimeString())
          }
        }, {
          title: '创建时间',
          key: 'createTime'
        }, {
          title: '附件',
          key: 'attachments',
          render: (h, params) => {
            let res = Array.from(params.row.attachments)
            if (res.length !== 0) {
              let attachmentList = []
              for (let item of res) {
                attachmentList.push(h('img', {
                  attrs: {
                    src: `//${this.host}/public/${item}`
                  },
                  style: {
                    width: '60px'
                  }
                }))
              }
              return h('div', {
                style: 'display: inline-block'
              }, attachmentList)
            }
          }
        }],
        tableData: [],
        modalVisiable: false}
    },
    computed: {
      ...mapGetters([
        'missions'
      ])
    },
    methods: {
      ...mapActions([
        'initMissionList',
        'removeMission',
        'updateMission',
        'addNewMission'
      ]),
      // tableData初始化
      async initTableData () {
        try {
          await this.initMissionList()
        } catch (err) {
          throw new Error(err)
        }
      },
      // 任务列表操作
      // 删除任务
      async remove (data) {
        try {
          await this.removeMission(data)
        } catch (err) {
          this.$Message.error(`remove mission: ${err}`)
        }
      },
      // 更新任务
      async update (data) {
        try {
          await this.updateMission(data)
        } catch (err) {
          this.$Message.error(`update mission: ${err}`)
        }
      },
      // 新建任务
      async createMission () {
        this.modalVisiable = true
      },
      // 关闭模态框
      async close () {
        this.modalVisiable = false
      }
    },
    beforeMount () {
      this.initTableData()
      console.log(`${this.host}/public/`)
    }
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    font-weight: bold;
    font-size: 30px;
    width: 150px;
    height: 50px;
    float: left;
    position: relative;
    color: white;
    top: 5px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
