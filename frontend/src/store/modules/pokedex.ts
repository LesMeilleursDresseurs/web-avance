import axios from 'axios'
import { API_URL } from '@/store'

const state = {
  cardsCollection: [],
}

const getters = {
  getCardsCollection(state) {
    return state.cardsCollection
  },
}

const actions = {
  async addCard({ commit }, id) {

  },
  async getCardsCollection({commit, dispatch}, userId) {
    axios.get(`${API_URL}/getCards?userId=${userId}`)
      .then((response) => {
        console.log(response)
        commit('setCards', response.data.cards)
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          {
            message: 'Error during the loading of the pokedex' + error,
            good: false,
          },
          { root: true },
        )
      })
  }
}

const mutations = {
  setCards(state, cards) {
    state.cardsCollection = cards
  },
  setAddCard(state, id) {
    state.cardsCollection.push(id)
  },
  removeCard(state, id) {
    state.cardsCollection = state.cardsCollection.filter((card) => card !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
