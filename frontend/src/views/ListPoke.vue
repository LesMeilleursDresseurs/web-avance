<template>
  <h1>Liste des Pokémon</h1>

  <div class="grid">
    <article v-for="pokemon in pokemons" :key="pokemon.id" class="card" @click="viewPokemonDetails(pokemon.id)">
      <header>
        <img :src="pokemon.image" :alt="pokemon.name" class="card-img" />
      </header>
      <footer>
        <h3>{{ pokemon.name }}</h3>
      </footer>
    </article>
  </div>

  <button @click="loadMore" class="secondary">Charger plus</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pokemons = ref([]);
const limit = 20; // Number of Pokemon per page
let offset = 0; // Start

async function fetchPokemons() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();


    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url).then((res) => res.json());
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default || '',
        };
      })
    );

    pokemons.value = [...pokemons.value, ...pokemonDetails];
    offset += limit;
  } catch (error) {
    console.error('Error when recovering Pokémon :', error);
  }
}

fetchPokemons();

function loadMore() {
  fetchPokemons();
}

function viewPokemonDetails(id) {
  console.log(`Navigate to Pokémon details using the ID : ${id}`);
  /* TO DO */
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}


.card-img {
  max-width: 100%;
  height: auto;
}
</style>
