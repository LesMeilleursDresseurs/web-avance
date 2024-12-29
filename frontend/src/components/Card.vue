<template>
  <div class="pokemon-card" @click="selectCard(card)">
    <img v-if="card.image" :src="cardImage" :alt="card.id" />
    <div v-else>
      <h4>{{ card.name }}</h4>
      <h4>{{ card.id }}</h4>
    </div>
    <div v-if="isAuthenticated" class="card-actions">
      <button
        v-if="!isInCollection"
        class="isNotIn"
        @click.stop="addToCollection"
        aria-label="Add to collection"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path d="M12 5v14m7-7H5" stroke="currentColor" stroke-width="2" fill="none" />
        </svg>
      </button>
      <button
        v-else
        class="isIn"
        @click.stop="removeFromCollection"
        aria-label="Remove from collection"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
          <path
            d="M3 6h18m-2 0v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6m5 4v6m4-6v6"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import store from '@/store'

export type Card = {
  id: string
  name: string
  image: string
}

export default {
  name: 'PokemonCard',
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    hq: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    if (this.isAuthenticated) {
      await store.dispatch(
        'pokedex/loadCardsCollection',
        store.getters['login/getUserConnected'].id,
      )
    }
  },
  computed: {
    cardImage(): string {
      return this.hq ? `${this.card.image}/high.webp` : `${this.card.image}/low.webp`
    },
    isAuthenticated() {
      return Object.keys(store.getters['login/getUserConnected']).length > 0
    },
    isInCollection() {
      for (let i = 0; i < store.getters['pokedex/getCardsCollection'].length; i++) {
        if (store.getters['pokedex/getCardsCollection'][i].id === this.card.id) return true
      }
      return false
    },
  },
  methods: {
    async addToCollection() {
      await store.dispatch('pokedex/addCard', this.card)
    },
    async removeFromCollection() {
      await store.dispatch('pokedex/removeCard', this.card)
    },
  },
}
</script>

<style scoped>
.pokemon-card {
  width: 250px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  position: relative;
}

.pokemon-card:hover {
  transform: scale(1.1);
}

.card-actions {
  position: absolute;
  top: -4px;
  right: -4%;
  padding: 0;
}
.card-actions button {
  width: 25px;
  height: 25px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.card-actions button.isNotIn {
  background-color: #579c49;
}
.card-actions button.isIn {
  background-color: #d95d57;
}

.card-actions svg {
  color: #fffdfd;
}
</style>
