<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <header class="site-header">
    <div class="logo-container">
      <img src="../assets/img/site-logo.png" alt="Logo du site" class="site-logo" />
    </div>
    <nav class="centered-nav">
      <button class="nav-button" @click="router.push('/pokedex-national')">Pokédex National</button>
      <button class="nav-button" @click="router.push('/jcc-pokemon')">JCC Pokémon</button>
    </nav>
    <button class="login-button" @click="router.push('/login')">Signup / Login</button>
  </header>
</template>

<style scoped>
header {
  z-index: 2;
}
.site-header {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  background-color: #ff6f61;
  color: white;
  border-bottom: 2px solid #ff5a50;
}

.logo-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 2%;
}

.site-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
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
  width: 50%;
}

.nav-button:hover {
  color: #ffe5e0;
}

.login-button {
  background: #d32f2f;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  right: 2%;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #b71c1c;
  transform: scale(1.05);
}

.login-button:active {
  transform: scale(1);
  background-color: #9a0007;
}
</style>
