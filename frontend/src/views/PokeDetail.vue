<template>
  <main>
    <MenuTopBar />
    <h1>{{ name }}</h1>
    <div class="gridContainer">
      <div class="grid">
        <div
          class="cardBox"
          v-for="card in cards"
          v-bind:key="card.id"
          @click="console.log(card.id, card.image)"
        >
          <img
            v-if="card.image"
            :src="`${card.image}/low.webp`"
            :alt="card.name"
            class="cardImg"
            :class="{ bigImg: hover === card.id }"
          />
          <div v-else>
            <h4>{{ card.name }}</h4>
            <h4>{{ card.id }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loading"><img src="@/assets/loader.gif" alt="loader" /></div>
  </main>
</template>

<script lang="ts">
import MenuTopBar from '@/components/MenuTopBar.vue'

type CardBrief = {
  id: string
  localId: string
  name: string
  image: string
}

interface IState {
  cards: Array<CardBrief>
  isLoading: boolean
  page: number
  hover: string
  timeout?: number
}

const itemPerPage = 15

export default {
  components: { MenuTopBar },
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
      const page = await res.json()
      if (page.length === 0) {
        this.isLoading = false
        window.removeEventListener('scroll', () => {})
        return
      }
      this.cards = [...this.cards, ...page]
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
        console.log('event')
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
  gap: 2rem;
}

.cardBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  border-radius: 10px;
  cursor: pointer;
  gap: 1rem;
  padding: 10px;
  background-color: #424242;
  transition: transform 0.2s;
}

.cardImg {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.cardBox:hover {
  transform: scale(1.15);
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
