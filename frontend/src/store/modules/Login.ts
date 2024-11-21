import axios from 'axios'
import { API_URL } from '../index'
import router from '@/router'

const state = {
  userConnected: {},
  loading: false,
}

const getters = {
  getUserConnected(state) {
    return state.userConnected
  },
  getLoading(state) {
    return state.loading
  },
}

const actions = {
  async logIn({ commit, dispatch }, userData) {
    await commit('setLoading', true)
    const user = {
      email: userData.email,
      picture: userData.picture,
      firstname: userData.family_name,
      lastname: userData.given_name,
    }
    axios
      .post(`${API_URL}/login`, user)
      .then(async (response) => {
        await commit('setUserConnected', response)
        router.push('/')
        await dispatch(
          'notification/newNotification',
          {
            message: 'Connection successfull',
            good: true,
          },
          { root: true },
        )
      })
      .catch(async (e) => {
        await dispatch(
          'notification/newNotification',
          {
            message: 'Error of connection',
            good: false,
          },
          { root: true },
        )
      })
      .finally(async () => {
        setTimeout(() => {
          commit('setLoading', false)
        }, 1000)
      })
  },
}

const mutations = {
  setUserConnected(state, value) {
    state.userConnected = {
      email: value.email,
      picture: value.picture,
      firstname: value.family_name,
      lastname: value.given_name,
    }
  },
  setLoading(state, value) {
    state.loading = value
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
