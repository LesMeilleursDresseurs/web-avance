<template>
  <MenuTopBar />
  <div class="container">
    <aside class="menu" :class="{open: navbarOpened}">
      <img src="@/assets/img/arrow.png"
           alt="button for opening"
           :class="{close: !navbarOpened, open: navbarOpened}"
           @click="navbarOpened=!navbarOpened"/>
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
    <div v-else-if="!isLoading && cards.length > 0" class="cards-grid" :class="{open: navbarOpened}">
      <PokemonCard v-for="card in cards" :card="card" :key="card.id" @click="openModal" />
    </div>
    <div v-else class="no-cards">
      <p>We don't have cards for this set.</p>
    </div>
  </div>
  <Modal v-if="selectedCard" :card="selectedCard" @close="closeModal" />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import MenuTopBar from '@/components/MenuTopBar.vue'
import PokemonCard, { type Card } from '@/components/Card.vue'
import Modal from '@/components/CardModal.vue'

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
const selectedCard = ref<Card | null>(null)
const navbarOpened = ref(true)

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

const openModal = (card: Card) => {
  selectedCard.value = card
}
const closeModal = () => {
  selectedCard.value = null
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
  background-color: #fdf6f5;
  height: 100%;
  padding: 1% 10px;
  position: sticky;
  left: 0;
  top: 0;
  transition: 0.3s;
}

.container aside.menu.open {
  overflow-y: auto;
  width: 15%;
}

.container aside.menu {
  overflow-y: hidden;
  width: 30px;
  padding: 0;
}

.container aside.menu img{
  width: 15px;
  display: block;
  margin: 10px auto;
  cursor: pointer;
  transition: 0.2s;
}

.container aside.menu img:hover{
  transform: scale(1.2);
}

.container aside.menu img.close{
  transform: rotateZ(-180deg);
}

.menu ul {
  list-style: none;
  padding: 0;
  opacity: 0;
}

.menu.open ul {
  opacity: 1;
}

.menu li {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #c4c6c6;
  transition: 0.2s ease;
}

.menu li.active {
  border-radius: 5px;
  border: 1px solid #c4c6c6;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 5px 0;
}

.menu li:hover {
  font-weight: bold;
}

.cards-grid {
  transition: 0.3s;
  width: calc(100% - 30px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1rem 25px;
}

.cards-grid.open{
  width: 85%;
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
