<template>
  <MenuTopBar />
  <div class="container">
    <aside class="menu">
      <ul>
        <li
          v-for="set in [...sets].reverse()"
          :key="set.id"
          @click="selectSet(set.id)"
          :class="{
            active: activeSet === set.id,
          }"
        >
          {{ set.name }}
        </li>
      </ul>
    </aside>
    <div v-if="isLoading" class="loading"><img src="@/assets/loader.gif" alt="loader" /></div>
    <div v-else-if="!isLoading && cards.length > 0" class="cards-grid">
      <PokemonCard v-for="card in cards" :card="card" :key="card.id" />
    </div>
    <div v-else class="no-cards">
      <p>We don't have cards for this set.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import MenuTopBar from '@/components/MenuTopBar.vue'
import PokemonCard, { type Card } from '@/components/Card.vue'

type objectSetsAndCards = {
  [setId: string]: Card[]
}

const props = defineProps({
  id: {
    required: true,
  },
})
const sets = ref<Array<string>>([])
const serie = ref<Array<string>>([])
const cards = ref<Card[]>([])
const activeSet = ref({})
//const ownedCards = ref([])
const seriesId = props.id
const isLoading = ref(true)
const SetsAndCards = ref<objectSetsAndCards>({})

const fetchSets = async () => {
  const response = await fetch(`https://api.tcgdex.net/v2/en/series/${seriesId}`)
  const data = await response.json()
  sets.value = data.sets
  serie.value = data
  if (sets.value.length > 0) {
    loadCards(sets.value[sets.value.length - 1].id)
    activeSet.value = sets.value[sets.value.length - 1].id
    console.log('last set', activeSet.value)
  }
}

const loadCards = async (setId: string) => {
  if (SetsAndCards.value[setId]) {
    cards.value = SetsAndCards.value[setId]
    isLoading.value = false
    return
  }
  const response = await fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`)
  const data = await response.json()
  cards.value = data.cards
  SetsAndCards.value[setId] = data.cards
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const selectSet = (setId: string) => {
  isLoading.value = true
  activeSet.value = setId
  loadCards(setId)
}

onMounted(() => {
  fetchSets()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap;
  margin-left: 0;
  height: calc(100vh - 63px);
  overflow-y: auto;
  width: 100vw;
  max-width: none !important;
}

.container aside.menu {
  width: 15%;
  padding-left: 1rem;
  background-color: #2c3e50;
  height: 100%;
  padding-top: 1%;
  position: sticky;
  left: 0;
  top: 0;
}
.menu ul {
  list-style: none;
  padding: 0;
}
.menu li {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #2c3e50;
}
.menu li.active {
  font-weight: bold;
}
.cards-grid {
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1rem 25px;
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.loading img {
  width: 6vw;
  height: 6vw;
}

.no-cards {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
