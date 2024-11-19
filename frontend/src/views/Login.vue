<template>
  <main>
    <span></span>
    <div class="form">
      <div>
        <h3>Sign up / Log in</h3>
        <p>to access your pokedex 🔥</p>
      </div>
      <div>
        <GoogleLogin :callback="callback" prompt class="google-btn"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import store from "@/store";
import { decodeCredential } from 'vue3-google-login'

export default defineComponent({
  name: "LoginPage",
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential)
      store.dispatch('login/logIn', userData)
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
  color: white;
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
  //background-color: rgba(255, 255, 255, 0.2); /* 10% opacity */
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
