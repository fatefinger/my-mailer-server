/**
 * Created by 杨帆 on 2018/1/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import missionList from '../mock/index.js'

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
   * set new mission to list
   * */
  ['SET_NEW_MISSION'](state, mission) {
    try {
      state.missions.push(mission)
    } catch (err) {
      console.log(`SET_NEW_MISSION: ${err}`)
    }
  },
  /**
   * remove mission
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
   * */
  ['UPDATE_MISSION'](state, mission) {
    try {

    } catch (err) {
      console.log(`UPDATE_MISSION: ${err}`)
    }
  }

}

const actions = {}


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

