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
            <Row type="flex" justify="end" align="middle" >
              <Col span="4">
              <Button type="primary" shape="circle" icon="plus">创建任务</Button>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle" style="margin-top: 10px">
              <Col span="24">
              <Table highlight-row ref="currentRowTable" :columns="tableHead" :data="tableData"></Table>
              </Col>
            </Row>
        </Card>
      </Content>
      <Footer class="layout-footer-center"></Footer>
    </Layout>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data () {
      return {
        tableHead: [{
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '收件人',
          width: 100,
          key: 'name'
        }, {
          title: '收件人地址',
          key: 'to'
        }, {
          title: '抄送',
          key: 'cc'
        }, {
          title: '标题',
          key: 'subject'
        }, {
          title: '发送时间',
          key: 'sendTime'
        }, {
          title: '创建时间',
          key: 'createTime'
        }, {
          title: '附件',
          key: 'attachments'
        }],
        tableData: []
      }
    },
    computed: {},
    methods: {},
    beforeMount () {

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
