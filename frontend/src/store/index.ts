import { createStore } from 'vuex'
import login from "./modules/Login"

export const API_URL = 'http://localhost:3000';

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    login
  },
})
