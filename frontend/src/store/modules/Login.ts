import axios from 'axios'
import { API_URL } from '../index'
import router from '@/router'

const state = {
  userConnected: JSON.parse(localStorage.getItem('userConnected')) || {},
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
      firstname: userData.given_name,
      lastname: userData.family_name,
    }
    axios
      .post(`${API_URL}/login`, user)
      .then(async (response) => {
        await commit('setUserConnected', response.data)
        localStorage.setItem('userConnected', JSON.stringify(response.data))

        //loading the connected user's card collection
        await dispatch('pokedex/loadCardsCollection', response.data.id, { root: true })

        await dispatch(
          'notification/newNotification',
          {
            message: 'Connection successfull',
            good: true,
          },
          { root: true }
        )
        await router.push('/')
      })
      .catch(async () => {
        await dispatch(
          'notification/newNotification',
          {
            message: 'Error of connection',
            good: false,
          },
          { root: true }
        )
      })
      .finally(async () => {
        setTimeout(() => {
          commit('setLoading', false)
        }, 1000)
      })
  },

  async logOut({ commit }) {
    await localStorage.removeItem('userConnected')
    await localStorage.removeItem('cardsCollection')
    commit('setUserConnected', {})
    commit('pokedex/setCards', [])
    router.push('/login')
  },
}

const mutations = {
  setUserConnected(state, value) {
    state.userConnected = value
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
