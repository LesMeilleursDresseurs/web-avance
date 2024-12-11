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
  async addCard({ commit, rootGetters, dispatch }, cardId: string) {
    const userConnected = rootGetters['login/getUserConnected']
    axios
      .post(`${API_URL}/addCard?cardId=${cardId}&userId=${userConnected.id}`)
      .then((response) => {
        commit('setAddCard', cardId)
        dispatch(
          'notification/newNotification',
          {
            message: cardId + ' card successfully added',
            good: true,
          },
          { root: true }
        )
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          {
            message: 'Error during the adding of the card' + error,
            good: false,
          },
          { root: true }
        )
      })
  },
  async removeCard({ commit, rootGetters, dispatch }, cardId: string) {
    const userConnected = rootGetters['login/getUserConnected']
    axios
      .delete(`${API_URL}/deleteCard?cardId=${cardId}&userId=${userConnected.id}`)
      .then((response) => {
        commit('removeCard', cardId)
        dispatch(
          'notification/newNotification',
          {
            message: cardId + ' card successfully deleted',
            good: false,
          },
          { root: true }
        )
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          {
            message: 'Error during the removing of the card' + error,
            good: false,
          },
          { root: true }
        )
      })
  },
  async loadCardsCollection({ commit, dispatch }, userId) {
    axios
      .get(`${API_URL}/getCards?userId=${userId}`)
      .then((response) => {
        commit('setCards', response.data.cards)
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          {
            message: 'Error during the loading of the pokedex' + error,
            good: false,
          },
          { root: true }
        )
      })
  },
}

const mutations = {
  setCards(state, cards) {
    state.cardsCollection = cards
  },
  setAddCard(state, id: String | null): void {
    state.cardsCollection.push(id)
  },
  removeCard(state, id: String | null): void {
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
