<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <header class="site-header">
    <nav class="centered-nav">
      <button class="nav-button" @click="router.push('/pokedex-national')">Pokédex National</button>
      <button class="nav-button" @click="router.push('/jcc-pokemon')">JCC Pokémon</button>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #ff6f61;
  color: white;
  border-bottom: 2px solid #ff5a50;
}

.centered-nav {
  display: flex;
  gap: 20px;
}

.nav-button {
  background: none;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  padding: 5px;
  transition: all 0.3s ease;
}

.nav-button::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-button:hover::after {
  width: 100%;
}

.nav-button:hover {
  color: white;
}
</style>
