/**
 * Created by 杨帆 on 2018/1/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {missionList} from '../mock/index.js'
import api from '../api/index.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  missions: [],
  missionForm: {
    from: '',
    to: '',
    cc: [],
    subject: '',
    text: '',
    html: '',
    attachments: []
  }
}

const getters = {
  missions: () => {
    return state.missions
  },
  missionForm: () => {
    return state.missionForm
  }
}

const mutations = {
  /**
   * set missions
   * @param state
   * @param missions(array)
   */
  ['SET_MISSIONS'] (state, missions) {
    try {
      state.missions = Array.from(missions)
      console.log(state.missions)
    } catch (err) {
      console.log(`SET_MISSIONS: ${err}`)
    }
  },
  /**
   * add new mission to list
   * @param state
   * @param mission(object)
   */
  ['CREATE_MISSION'] (state, mission) {
    try {
      state.missions.push(mission)
    } catch (err) {
      console.log(`ADD_NEW_MISSION: ${err}`)
    }
  },
  /**
   * remove mission
   * @param state
   * @param mission(object)
   * */
  ['REMOVE_MISSION'] (state, mission) {
    try {
      for (let i = 0; i < state.missions.length; i++) {
        if (state.missions[i].id === mission.id) {
          state.missions.splice(i, 1)
          return
        }
      }
    } catch (err) {
      console.log(`REMOVE_MISSION: ${err}`)
    }
  },
  /**
   * update mission
   * @param state
   * @param mission(object)
   * */
  ['UPDATE_MISSION'] (state, mission) {
    try {
      for (let i = 0; i < state.missions.length; i++) {
        if (state.missions[i].id === mission.id) {
          state.missions[i] = mission
          return
        }
      }
    } catch (err) {
      console.log(`UPDATE_MISSION: ${err}`)
    }
  },
  /**
   * set missionForm
   * @param state
   * @param form
   * @constructor
   */
  ['SET_MISSION_FORM'] (state, form) {
    try {
      state.missionForm = form
    } catch (err) {
      console.log(`SET_MISSION_FORM: ${err}`)
    }
  }
}

const actions = {
  /**
   * init state.missions from server
   * @param commit
   * @param state
   * @returns {Promise<any>}
   */
  async initMissionList ({commit, state}) {
    try {
      let res = await api.getMissionList()
      let data = res.data
      commit('SET_MISSIONS', data)
    } catch (err) {
      throw new Error(err)
    }
  },
  // /**
  //  * remove mission
  //  * @param commit
  //  * @param state
  //  * @param mission(object)
  //  * @returns {Promise<any>}
  //  */
  // removeMission({commit, state}, mission) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       /* delete mission id to server */
  //       let data = {
  //         state: 'success',
  //         data: mission
  //       }
  //       commit('REMOVE_MISSION', data.data)
  //       resolve(true)
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // },
  // /**
  //  * update mission
  //  * @param commit
  //  * @param state
  //  * @param mission
  //  * @returns {Promise<any>}
  //  */
  // updateMission({commit, state}, mission) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       /* update mission id to server */
  //       let data = {
  //         state: 'success',
  //         data: mission
  //       }
  //       commit('UPDATE_MISSION', data.data)
  //       resolve(true)
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // },
  /**
   * add new mission to state.missions
   * @param commit
   * @param state
   * @param mission
   * @returns {Promise<any>}
   */
  async createMission ({commit, state}, mission) {
    try {
      let res = await api.createMission(mission)
      let data = res.data
      commit('CREATE_MISSION', data.data)
    } catch (err) {
      console.log(`createMission Error: ${err}`)
    }
  }

}

const store = new Vuex.Store(
  {
    state,
    getters,
    actions,
    mutations,
    strict: debug
  }
)

export default store
