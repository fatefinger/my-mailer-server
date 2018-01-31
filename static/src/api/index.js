/**
 * Created by 杨帆 on 2018/1/19.
 */
'use strict'

import axios from 'axios'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: response.data.msg
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
  }
  if (res.data && (!res.data.success)) {
    console.log(res.data.message)
  }
  return res
}

const api = {
  /**
   * 获取任务列表
   * @return {Promise<AxiosResponse<any>>}
   */
  getMissionList () {
    return axios.get('/mission').then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  /**
   * 创建任务
   * @param data
   * @return {Promise<AxiosResponse<any>>}
   */
  createMission (data) {
    return axios({
      method: 'post',
      url: '/mission',
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}

export default api
