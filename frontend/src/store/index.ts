import { createStore } from 'vuex'
import login from './modules/Login'
import notification from './modules/notification'
import pokedex from '@/store/modules/pokedex'

export const API_URL = 'http://localhost:3000'

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    login,
    notification,
    pokedex,
  },
})
