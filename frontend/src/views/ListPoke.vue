<template>
  <MenuTopBar />
  <h1>National Pokédex</h1>

  <!--Filtre-->
  <div class="filter-bar">
    <input
    type="text"
    v-model="recherchePokemonRequete"
    @input="recherchePokemon"
    placeholder="Search Pokemon by name..."
    class="search-input"
    />
  </div>

  <div class="grid">
    <article
      v-for="pokemon in (recherchePokemonRequete ? recherchePokemonResult : pokemons)"
      :key="pokemon.id"
      class="card"
      @click="viewPokemonDetails(pokemon.id)"
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
  <div v-if="isLoading" class="loading"><img src="@/assets/loader.gif" /></div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import MenuTopBar from '@/components/MenuTopBar.vue'
import { useRouter } from 'vue-router'

interface Pokemon {
  id: number
  name: string
  image: string
}

const router = useRouter()
const pokemons = ref<Pokemon[]>([])// Pokémon actuellement affichés sur la page
const limit = 20 // Number of Pokémon per page
let offset = 0 // Start
const isLoading = ref(true)
const recherchePokemonRequete = ref('')
const recherchePokemonResult = ref<Pokemon[]>([])

async function fetchPokemons() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await response.json()
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokemonData = await fetch(pokemon.url).then((res) => res.json())
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default || '',
      }
    }),
  )
  pokemons.value = [...pokemons.value, ...pokemonDetails]
  console.log('offset', offset)
  offset += limit
  setTimeout(() => {
    isLoading.value = false
  }, 4000)
}

// Recherche Pokémon
async function recherchePokemon() {
  if(!recherchePokemonRequete.value.trim()) {
    recherchePokemonResult.value = [] // Si le champs de recherche est vide
    return
  }
  isLoading.value = true
  try {
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${recherchePokemonRequete.value.toLowerCase()}`)
    if(!reponse.ok) throw new Error('Pokemon not found')
    const pokemonData = await reponse.json()
    recherchePokemonResult.value = [
      {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default || '',
      },
    ]
  } catch (err) {
    recherchePokemonResult.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPokemons()
  window.addEventListener('scroll', async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading.value
    ) {
      isLoading.value = true
      await fetchPokemons()
      console.log('event')
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})

function viewPokemonDetails(id) {
  console.log(`Navigate to Pokémon details using the ID : ${id}`)
  router.push({ name: 'PokeDetail', params: { id } })
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem;
  background: white;
  border-radius: 5px;
  width: 90%;
  margin: auto;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
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
