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
  async addCard({ commit, rootGetters, dispatch }, card) {
    const userConnected = rootGetters['login/getUserConnected']
    card.idUser = userConnected.id

    await axios
      .post(`${API_URL}/addCard`, card)
      .then(() => {
        commit('addCardToCollection', card)
        dispatch(
          'notification/newNotification',
          { message: `${card.name} added successfully`, good: true },
          { root: true },
        )
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          { message: `Error adding card: ${error}`, good: false },
          { root: true },
        )
      })
  },
  async removeCard({ commit, rootGetters, dispatch }, card) {
    const userConnected = rootGetters['login/getUserConnected']

    await axios
      .delete(`${API_URL}/deleteCard?cardId=${card.id}&userId=${userConnected.id}`)
      .then(() => {
        commit('removeCardFromCollection', card.id)
        dispatch(
          'notification/newNotification',
          { message: `Card removed successfully`, good: true },
          { root: true },
        )
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          { message: `Error removing card: ${error}`, good: false },
          { root: true },
        )
      })
  },
  async loadCardsCollection({ commit, dispatch }, userId) {
    await axios
      .get(`${API_URL}/getCards?userId=${userId}`)
      .then((response) => {
        commit('setCardsCollection', response.data.cards)
      })
      .catch(async (error) => {
        await dispatch(
          'notification/newNotification',
          { message: `Error loading cards: ${error}`, good: false },
          { root: true },
        )
      })
  },
}

const mutations = {
  setCardsCollection(state, cards) {
    state.cardsCollection = cards
  },
  addCardToCollection(state, card) {
    state.cardsCollection.push(card)
  },
  removeCardFromCollection(state, cardId) {
    state.cardsCollection = state.cardsCollection.filter((card) => card.id !== cardId)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
