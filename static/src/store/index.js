/**
 * Created by 杨帆 on 2018/1/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {missionList} from '../mock/index.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  missions: []
}

const getters = {
  missions: () => {
    return state.missions
  }
}

const mutations = {
  /**
   * set missions
   * @param state
   * @param missions(array)
   */
  ['SET_MISSIONS'](state, missions) {
    try {
      state.missions = missions
    } catch (err) {
      console.log(`SET_MISSIONS: ${err}`)
    }
  },
  /**
   * add new mission to list
   * @param state
   * @param mission(object)
   */
  ['ADD_NEW_MISSION'](state, mission) {
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
  ['REMOVE_MISSION'](state, mission) {
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
  ['UPDATE_MISSION'](state, mission) {
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
  }
}

const actions = {
  /**
   * init state.missions from server
   * @param commit
   * @param state
   * @returns {Promise<any>}
   */
  initMissionList({commit, state}) {
    return new Promise((resolve, reject) => {
      try {
        /* get missions from server */
        let data = missionList // mock数据代替
        commit('SET_MISSIONS', data)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  /**
   * remove mission
   * @param commit
   * @param state
   * @param mission(object)
   * @returns {Promise<any>}
   */
  removeMission({commit, state}, mission) {
    return new Promise((resolve, reject) => {
      try {
        /* delete mission id to server */
        let data = {
          state: success,
          data: mission
        }
        commit('REMOVE_MISSION', mission)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  /**
   * update mission
   * @param commit
   * @param state
   * @param mission
   * @returns {Promise<any>}
   */
  updateMission({commit, state}, mission) {
    return new Promise((resolve, reject) => {
      try {
        /* update mission id to server */
        let data = {
          state: success,
          data: mission
        }
        commit('UPDATE_MISSION', mission)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  /**
   * add new mission to state.missions
   * @param commit
   * @param state
   * @param mission
   * @returns {Promise<any>}
   */
  addNewMission({commit, state}, mission) {
    return new Promise((resolve, reject) => {
      try {
        /* add mission to server */
        let data = {
          state: success,
          data: mission
        }
        commit('ADD_NEW_MISSION', mission)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
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

