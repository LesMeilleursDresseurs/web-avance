
const state = {
  userConnected: {}
}

const getters = {
  getUserConnected(state) { return state.userConnected }
}

const actions = {
  logIn({commit}, userData) {
    commit('setUserConnected', userData)
    console.log(userData)
  }
}

const mutations = {
  setUserConnected(state, value) {
    state.userConnected = {
      'email': value.email,
      'picture': value.picture,
      'firstname': value.family_name,
      'lastname': value.given_name
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
