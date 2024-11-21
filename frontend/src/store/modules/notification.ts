const state = {
  notification: [],
}

const getters = {
  getNotifications(state) {
    return state.notification
  },
}

const actions = {
  async newNotification({ commit }, { message, good }) {
    const id = Date.now()
    commit('setNotification', {
      id: id,
      message: message,
      good: good,
      appear: true,
    })
    setTimeout(() => {
      commit('removeNotification', id)
    }, 3000)
  },
}

const mutations = {
  setNotification(state, { id, message, good, appear }) {
    state.notification.push({
      id: id,
      appear: appear,
      message: message,
      good: good,
    })
  },
  removeNotification(state, id) {
    state.notification = state.notification.filter((notification) => notification.id !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
