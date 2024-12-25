<template>
  <MenuTopBar />
  <h1>National Pokédex</h1>

  <!--Filtre-->
  <div class="filter-bar">
    <div class="search-and-generations">
      <!--Recherche par nom ou ID-->
      <input
        type="text"
        v-model="recherchePokemonRequete"
        @input="filterAndSearch"
        placeholder="Search Pokémon by name or ID..."
        class="search-input"
      />

      <!--Recherche par génération-->
      <div class="generation-filter">
        <span class="generation-label">Generation : </span>
        <button class="filter-button all" @click="selectAllGenerations">All</button>
        <button class="filter-button none" @click="clearGenerations">None</button>
        <div class="generation-buttons">
          <button
            v-for="gen in generations"
            :key="gen.value"
            :class="['generation-button', { active: selectedGenerations.includes(gen.value) }]"
            @click="toggleGeneration(gen.value)"
          >
            {{ getGenerationNumber(gen.value) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Recherche par type -->
    <div class="type-filter">
      <span class="type-label">Type :</span>
      <button class="filter-button all" @click="selectAllTypes">All</button>
      <button class="filter-button none" @click="clearTypes">None</button>
      <div class="type-buttons">
        <button
          v-for="type in types"
          :key="type.id"
          :class="['type-button', { active: selectedTypes.includes(type.id) }]"
          @click="toggleType(type.id)"
        >
          <img :src="type.icon" :alt="type.name" />
        </button>
      </div>
    </div>
  </div>

  <div class="grid">
    <article
      v-for="pokemon in getDisplayPokemons()"
      :key="pokemon.id"
      class="card"
      @click="viewPokemonDetails(pokemon.name)"
    >
      <header>
        <img :src="pokemon.image" :alt="pokemon.name" class="card-img" />
      </header>
      <footer>
        <h4>{{ pokemon.name }}</h4>
      </footer>
      <div class="idPoke">#{{ pokemon.id }}</div>
    </article>
  </div>
  <div v-if="isLoading" class="loading"><img src="@/assets/loader.gif" alt="loader" /></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MenuTopBar from '@/components/MenuTopBar.vue'
import { useRouter } from 'vue-router'

// Information récupérées d'un Pokémon
interface Pokemon {
  id: number
  name: string
  image: string
}

// Variables
const router = useRouter()
const allPokemons = ref<Pokemon[]>([]) // Tous les Pokémons
const displayedPokemons = ref<Pokemon[]>([]) // Pokémon affichés après filtres éventuels
const isLoading = ref(true)
const recherchePokemonRequete = ref('')
const generations = ref([
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
])
const selectedGenerations = ref<number[]>(generations.value.map((gen) => gen.value))
const visibleCount = ref(20) // Nombre de Pokémon visible au chargement de la page
const types = ref([
  { id: 'normal', name: 'Normal', icon: 'src/assets/img/icon/Icône_Type_Normal_HOME.png' },
  { id: 'grass', name: 'Grass', icon: 'src/assets/img/icon/Icône_Type_Plante_HOME.png' },
  { id: 'fire', name: 'Fire', icon: 'src/assets/img/icon/Icône_Type_Feu_HOME.png' },
  { id: 'water', name: 'Water', icon: 'src/assets/img/icon/Icône_Type_Eau_HOME.png' },
  { id: 'electric', name: 'Electric', icon: 'src/assets/img/icon/Icône_Type_Électrik_HOME.png' },
  { id: 'flying', name: 'Flying', icon: 'src/assets/img/icon/Icône_Type_Vol_HOME.png' },
  { id: 'bug', name: 'Bug', icon: 'src/assets/img/icon/Icône_Type_Insecte_HOME.png' },
  { id: 'rock', name: 'Rock', icon: 'src/assets/img/icon/Icône_Type_Roche_HOME.png' },
  { id: 'ground', name: 'Ground', icon: 'src/assets/img/icon/Icône_Type_Sol_HOME.png' },
  { id: 'psychic', name: 'Psychic', icon: 'src/assets/img/icon/Icône_Type_Psy_HOME.png' },
  { id: 'poison', name: 'Poison', icon: 'src/assets/img/icon/Icône_Type_Poison_HOME.png' },
  { id: 'ghost', name: 'Ghost', icon: 'src/assets/img/icon/Icône_Type_Spectre_HOME.png' },
  { id: 'dark', name: 'Dark', icon: 'src/assets/img/icon/Icône_Type_Ténèbres_HOME.png' },
  { id: 'steel', name: 'Steel', icon: 'src/assets/img/icon/Icône_Type_Acier_HOME.png' },
  { id: 'fighting', name: 'Fighting', icon: 'src/assets/img/icon/Icône_Type_Combat_HOME.png' },
  { id: 'ice', name: 'Ice', icon: 'src/assets/img/icon/Icône_Type_Glace_HOME.png' },
  { id: 'dragon', name: 'dragon', icon: 'src/assets/img/icon/Icône_Type_Dragon_HOME.png' },
  { id: 'fairy', name: 'Fairy', icon: 'src/assets/img/icon/Icône_Type_Fée_HOME.png' },
])
  const selectedTypes = ref<string[]>([
    'normal',
    'grass',
    'fire',
    'water',
    'electric',
    'flying',
    'bug',
    'rock',
    'ground',
    'psychic',
    'poison',
    'ghost',
    'dark',
    'steel',
    'fighting',
    'ice',
    'dragon',
    'fairy',
  ])

async function fetchAllPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
    if (!response.ok) throw new Error('Erreur lors du chargement des Pokémon')
    const data = await response.json()

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url).then((res) => res.json())
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default || '',
          types: pokemonData.types.map((type) => type.type.name),
        }
      }),
    )

    allPokemons.value = pokemonDetails // Stockage des Pokémon
    displayedPokemons.value = pokemonDetails // Initialiser la liste à afficher
    isLoading.value = false
  } catch (err) {
    console.error('Erreur lors du chargement des Pokémon :', err)

    isLoading.value = false
  }
}

// Filtrage par génération
function filterByGeneration(pokemons: Pokemon[]): Pokemon[] {
  if (selectedGenerations.value.length === 0) {
    return pokemons
  }

  return pokemons.filter((pokemon) => {
    const id = pokemon.id
    return (
      (selectedGenerations.value.includes(1) && id >= 1 && id <= 151) ||
      (selectedGenerations.value.includes(2) && id >= 152 && id <= 251) ||
      (selectedGenerations.value.includes(3) && id >= 252 && id <= 386) ||
      (selectedGenerations.value.includes(4) && id >= 387 && id <= 493) ||
      (selectedGenerations.value.includes(5) && id >= 494 && id <= 649) ||
      (selectedGenerations.value.includes(6) && id >= 650 && id <= 721) ||
      (selectedGenerations.value.includes(7) && id >= 722 && id <= 809) ||
      (selectedGenerations.value.includes(8) && id >= 810 && id <= 905) ||
      (selectedGenerations.value.includes(9) && id >= 906 && id <= 1025)
    )
  })
}

// Filtrage par recherche textuelle
function filterBySearch(pokemons: Pokemon[]): Pokemon[] {
  const query = recherchePokemonRequete.value.trim().toLowerCase()
  if (!query) {
    return pokemons // Aucun texte recherché, afficher tous les Pokémon
  }

  return pokemons.filter(
    (pokemon) => pokemon.name.toLowerCase().includes(query) || pokemon.id.toString() === query,
  )
}

// Combinaison des filtres
function filterAndSearch() {
  if (selectedGenerations.value.length === 0 || selectedTypes.value.length === 0) {
    displayedPokemons.value = []
    return
  }

  let filtered = filterByGeneration(allPokemons.value)
  filtered = filterByType(filtered)
  filtered = filterBySearch(filtered)

  displayedPokemons.value = filtered
}

function selectAllGenerations() {
  selectedGenerations.value = generations.value.map((gen) => gen.value)
  filterAndSearch()
}

function clearGenerations() {
  selectedGenerations.value = []
  filterAndSearch()
}

function selectAllTypes() {
  selectedTypes.value = types.value.map((type) => type.id)
  filterAndSearch()
}

function clearTypes() {
  selectedTypes.value = []
  filterAndSearch()
}

function getDisplayPokemons(): Pokemon[] {
  return displayedPokemons.value.slice(0, visibleCount.value)
}

function loadMorePokemons() {
  visibleCount.value += 20
}

function getGenerationNumber(num: number): string {
  const numberMap = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  return numberMap[num - 1]
}

function toggleGeneration(gen: number) {
  if (selectedGenerations.value.includes(gen)) {
    selectedGenerations.value = selectedGenerations.value.filter((g) => g !== gen)
  } else {
    selectedGenerations.value.push(gen)
  }
  filterAndSearch()
}

function toggleType(typeId: string) {
  if (selectedTypes.value.includes(typeId)) {
    selectedTypes.value = selectedTypes.value.filter((id) => id !== typeId)
  } else {
    selectedTypes.value.push(typeId)
  }
  filterAndSearch()
}

function filterByType(pokemons: Pokemon[]): Pokemon[] {
  if (selectedTypes.value.length === 0) {
    return pokemons
  }

  return pokemons.filter((pokemon) =>
    pokemon.types.some((type) => selectedTypes.value.includes(type)),
  )
}

onMounted(async () => {
  console.log('Chargement intial')
  fetchAllPokemons()

  window.addEventListener('scroll', () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      visibleCount.value < displayedPokemons.value.length
    ) {
      loadMorePokemons()
    }
  })
})

function viewPokemonDetails(name: string) {
  router.push({ name: 'PokeDetail', params: { name } })
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

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  width: 90%;
  margin: 1rem auto;
}

.search-and-generations {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.search-input {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 0.7rem;
  background-color: #eaeef3;
  color: #2c3e50;
  margin-bottom: 0;
  height: 50px;
}

.generation-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.generation-label {
  font-size: 0.7rem;
  font-weight: bold;
  color: #343a40;
}

.filter-button {
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 50px;
  line-height: 20px;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #0056b3;
}

.generation-buttons {
  display: flex;
  gap: 0.4rem;
}

.generation-button {
  padding: 0.3rem 0.6rem;
  width: 50px;
  border: none;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  line-height: 20px;
  transition: all 0.3s ease;
  background-color: #dc3545;
  color: white;
}

.generation-button.active {
  background-color: #28a745;
}

.generation-button:hover {
  transform: scale(1.1);
}

.type-filter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.type-label {
  font-size: 0.7rem;
  font-weight: bold;
  color: #343a40;
}

.type-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.type-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: opacity(0.5);
  overflow: hidden;
  padding: 0;
}

.type-button img {
  width: 75%;
  height: 75%;
  object-fit: contain;
}

.type-button.active {
  filter: none;
}

.type-button:hover {
  transform: scale(1.1);
}

header {
  margin-bottom: 0;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 3vw;
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

.card footer {
  margin-top: 0;
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
</style>
