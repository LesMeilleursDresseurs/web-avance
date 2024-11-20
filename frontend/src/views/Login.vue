<template>
  <main>
    <span></span>
    <div class="form">
      <div>
        <h3 class="no-pico">Sign up / Log in</h3>
        <p class="no-pico">to access your pokedex 🔥</p>
      </div>
      <div v-if="!loading">
        <GoogleLogin :callback="callback" prompt class="google-btn"/>
        <p v-if="error !== null" class="error-msg">{{ error }}</p>
      </div>
      <img class="loader" src="@/assets/loader.gif" alt="logo" v-if="loading">
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import store from "@/store";
import { decodeCredential } from 'vue3-google-login'

export default defineComponent({
  name: "LoginPage",
  computed: {
    error : () => { return store.getters['login/getError'] },
    loading: () => { return store.getters['login/getLoading'] }
  },
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential)
      await store.dispatch('login/logIn', userData)
      if(this.error !== null) {
        // TODO: change the path
        this.$router.push('/')
      }
    },
  }
})
</script>

<style scoped>
main {
  margin: 0 0;
  padding: 0 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

span {
  background-image: url("@/assets/img/login-wallpaper.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
  top: 1%;
  left: 0.5%;
  width: 99%;
  height: 98%;
  position: absolute;
}

div.form {
  color: white !important;
  width: 400px;
  height: 40%;
  display: flex;
  left: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  border-radius: 10px;
  animation: blur-effect 0.5s forwards;
  text-align: center;
  //background-color: rgba(255, 255, 255, 0.2); /* 10% opacity */
}

.no-pico {
  color: white !important;
}

.error-msg {
  color: red !important;
  text-align: center;
}

.loader {
  width: 100px;
}

@keyframes blur-effect {
  0% {
    backdrop-filter: blur(0px);
    opacity: 0;
  } 100% {
    backdrop-filter: blur(40px);
  opacity: 1;
  }
}
</style>
