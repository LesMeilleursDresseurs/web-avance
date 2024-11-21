<template>
  <div v-if="card.image" class="pokemon-card">
    <img :src="cardImage" :alt="card.id" />
  </div>
  <div v-else class="pokemon-card">
    <h4>{{ card.name }}</h4>
    <h4>{{ card.id }}</h4>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

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
  computed: {
    cardImage(): string {
      return this.hq ? `${this.card.image}/high.webp` : `${this.card.image}/low.webp`
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
}

.pokemon-card:hover {
  transform: scale(1.1);
}
</style>
