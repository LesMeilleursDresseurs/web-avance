<template>
  <header class="site-header">
    <div class="logo-container">
      <img src="../assets/img/site-logo.png" alt="Logo du site" class="site-logo" />
    </div>
    <nav class="centered-nav">
      <button class="nav-button" @click="goPokedexNational">Pokédex National</button>
      <button class="nav-button" @click="goJccPokemon">JCC Pokémon</button>
    </nav>
    <button
      v-if="userConnected.id === undefined || userConnected.id === null"
      class="login-button"
      @click="goLogin"
    >
      Signup / Login
    </button>
    <div v-else class="logged" :class="{ open: option }">
      <img
        v-if="
          userConnected.picture !== undefined &&
          userConnected.picture !== null &&
          userConnected.picture !== ''
        "
        class="picture"
        :src="userConnected.picture"
        alt="profil picture google account"
      />
      <p
        v-else-if="
          userConnected.firstname !== undefined &&
          userConnected.firstname !== null &&
          userConnected.firstname !== ''
        "
      >
        {{ userConnected.firstname }}
      </p>
      <p
        v-else-if="
          userConnected.lastname !== undefined &&
          userConnected.lastname !== null &&
          userConnected.lastname !== ''
        "
      >
        {{ userConnected.lastname }}
      </p>
      <img
        class="option"
        @click="option = !option"
        src="@/assets/img/option.png"
        alt="image option"
      />
      <nav>
        <button class="nav-button" @click="goProfile">Profile</button>
        <button class="nav-button" @click="logout">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import store from '@/store'

export default {
  name: 'MenuTopBar',
  computed: {
    userConnected: () => {
      return store.getters['login/getUserConnected']
    },
  },
  data() {
    return {
      option: false,
    }
  },
  mounted() {
    console.log(this.userConnected.id)
  },
  methods: {
    goPokedexNational() {
      this.$router.push('/pokedex-national')
    },
    goJccPokemon() {
      this.$router.push('/jcc-pokemon')
    },
    goLogin() {
      this.$router.push('/login')
    },
    logout() {
      store.dispatch('login/logOut')
    },
    goProfile() {
      this.$router.push('/profile')
    },
  },
}
</script>

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
  width: 100%;
  z-index: 2;
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

.logged {
  position: absolute;
  right: 2%;
  display: flex;
  align-items: center;
  justify-content: end;
  min-width: 130px;
  padding: 3px 0;
  border-radius: 5px;
  transition: background-color 0.5s ease-out;
}

.logged.open {
  background-color: #d32f2f;
}

.logged img.picture {
  border-radius: 50%;
  width: 30px;
}

.logged p {
  margin: 0 0;
  color: white;
}

.logged .option {
  margin-left: 5px;
  opacity: 0.7;
  width: 30px;
  background: #d32f2f;
  color: white;
  font-weight: bold;
  border: none;
  padding: 2px 4px;
  border-radius: 5px;
  cursor: pointer;
}

.logged .option:hover {
  background-color: #b71c1c;
  transform: scale(1.05);
}

.logged .option:active {
  transform: scale(1);
  background-color: #9a0007;
}

.logged nav {
  width: 100%;
  height: 0;
  position: absolute;
  top: 34px;
  background: #d32f2f;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow: hidden;
  transition: height 0.3s ease;
}

.logged.open nav {
  padding-top: 10px;
  height: 76px;
}

.logged.open nav button.nav-button {
  background: none;
  border: none;
  margin: 0 0;
  font-size: 1em !important;
  font-weight: initial;
}

.logged.open nav button.nav-button:hover {
  background-color: #b71c1c;
  transform: scale(1.05);
}

.logged.open nav button.nav-button:active {
  transform: scale(1);
  background-color: #9a0007;
}
</style>
