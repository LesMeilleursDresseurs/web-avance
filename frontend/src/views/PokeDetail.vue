<template>
  <main>
    <MenuTopBar />
    <h1>{{ name }}</h1>
    <div class="gridContainer">
      <div class="grid">
        <PokemonCard :card="card" v-for="card in cards" :key="card.id" />
      </div>
    </div>
    <div v-if="isLoading" class="loading"><img src="@/assets/loader.gif" alt="loader" /></div>
  </main>
</template>

<script lang="ts">
import MenuTopBar from '@/components/MenuTopBar.vue'
import PokemonCard, { type Card } from '@/components/Card.vue'

type CardBrief = {
  localId: string
} & Card

interface IState {
  cards: Array<CardBrief>
  isLoading: boolean
  page: number
  hover: string
  timeout?: number
}

const itemPerPage = 20

export default {
  components: { PokemonCard, MenuTopBar },
  data(): IState {
    return {
      cards: [],
      isLoading: false,
      page: 1,
      hover: '',
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    async fetchCards() {
      this.isLoading = true
      const res = await fetch(
        `https://api.tcgdex.net/v2/en/cards?name=${this.name}&category=Pokemon&pagination:page=${this.page}&pagination:itemsPerPage=${itemPerPage}`,
      )
      const newCards = await res.json()
      if (newCards.length === 0) {
        this.isLoading = false
        window.removeEventListener('scroll', () => {})
        return
      }
      this.cards = [...this.cards, ...newCards]
      this.page++
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
  },
  created() {
    this.$watch(() => this.$route.params.name, this.fetchCards, { immediate: true })

    window.addEventListener('scroll', async () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !this.isLoading
      ) {
        await this.fetchCards()
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', () => {})
  },
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

h1 {
  text-align: center;
  margin: 1rem auto;
  font-size: 3rem;
  text-transform: capitalize;
}

h4 {
  text-align: center;
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
}

.loading img {
  width: 6vw;
}
</style>
