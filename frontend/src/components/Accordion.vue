<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggle">
      <span>{{ isOpen ? '⯆' : '▲ ' }}</span>
    </div>
    <div class="accordion-body" v-if="isOpen">
      <div class="cards-grid">
        <PokemonCard class="pokemon-card" v-for="card in otherCards" :card="card" :key="card.id" />
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/Card.vue'

export default {
  components: { PokemonCard },
  props: {
    title: {
      type: String,
      required: true,
    },
    otherCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.accordion {
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}
.accordion-header {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  background-color: #d2d1c1;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
  margin: 0 40vw;
}
.accordion-body {
  padding: 15px;
  border-top: 1px solid #ddd;
  animation: fadeIn 0.3s ease;
}
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 25px;
  margin: 0 auto;
}
.pokemon-card {
  cursor: initial !important;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
