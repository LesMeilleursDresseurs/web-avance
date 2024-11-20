<template>
  <main>
    <div class="grid">
      <article v-for="card in cards" :key="card.id" class="card" @click="logCard(card)">
        <img :src="`${card.image}/low.webp`" :alt="card.name" class="card-img" />
      </article>
    </div>
  </main>
</template>

<script lang="ts">
type CardBrief = {
  id: string
  localId: string
  name: string
  image: string
}

interface IState {
  cards?: Array<CardBrief>
}

export default {
  data(): IState {
    return {
      cards: [],
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
      const res = await fetch(`https://api.tcgdex.net/v2/en/cards?name=${this.name}`)
      this.cards = await res.json()
    },
    logCard(card: CardBrief) {
      console.log(card.id, card.localId, card.image, card.name)
    },
  },
  created() {
    this.$watch(() => this.$route.params.id, this.fetchCards, { immediate: true })
  },
}
</script>

<style scoped>
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
}
.loading img {
  width: 6vw;
}

h1 {
  text-align: center;
  margin: 1rem auto;
  font-size: 1.8vw;
}

header {
  margin-bottom: 0;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 3vw;
  padding: 0 1vw;
}

.card {
  flex: 0 1 calc(20% - 2rem);
  box-sizing: content-box;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  transition: transform 0.2s;
  position: relative;
}

div.idPoke {
  position: absolute;
  top: 1vw;
  right: 1.2vw;
  font-size: 1vw;
  background-color: #6b6d65;
  border: #f2f2f2 solid 1px;
  border-radius: 0.5rem;
  padding: 3px;
}

.card:hover {
  transform: scale(1.2);
}

.card footer h4 {
  font-size: 1.4vw;
  margin-bottom: 0;
}

img.card-img {
  max-width: 100%;
  width: 10vw;
  image-rendering: pixelated;
}

button.secondary {
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button.secondary:hover {
  background-color: #0056b3;
}
</style>
