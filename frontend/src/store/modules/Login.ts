import axios from 'axios'
import { API_URL } from '../index'

const state = {
  userConnected: {},
  error: null,
  loading: false,
}

const getters = {
  getUserConnected(state) {
    return state.userConnected
  },
  getError(state) {
    return state.error
  },
  getLoading(state) {
    return state.loading
  },
}

const actions = {
  async logIn({ commit }, userData) {
    await commit('setLoading', true)
    await commit('setError', null)
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
      })
      .catch(async (e) => {
        await commit('setError', e.response.data.error)
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
    state.userConnected = value
  },
  setError(state, value) {
    state.error = value
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
