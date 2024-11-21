<template>
  <div class="body">
    <MenuTopBar />
    <main>
      <div class="profile-details">
        <img v-if="userConnected.picture !== undefined && userConnected.picture !== null && userConnected.picture !== ''"
             class="picture"
             :src="userConnected.picture"
             alt="profil picture google account"/>
        <p><strong>Email: </strong>{{ userConnected.email }}</p>
        <div class="first-last-names">
          <p v-if="userConnected.firstname !== undefined && userConnected.firstname !== null && userConnected.firstname !== ''">
            {{ userConnected.firstname }}
          </p>
          <p v-if="userConnected.lastname !== undefined && userConnected.lastname !== null && userConnected.lastname !== ''">
            {{ userConnected.lastname }}
          </p>
        </div>
        <div class="stats">
          <p><strong>Total </strong>cards: {{ cardsCollection.length }}</p>
        </div>
      </div>
      <div class="content">

      </div>
    </main>
  </div>
</template>


<script lang="ts">
import MenuTopBar from '@/components/MenuTopBar.vue'
import store from '@/store'

export default {
  name: 'ProfilePage',
  components: { MenuTopBar },
  computed: {
    userConnected: () => {
      return store.getters['login/getUserConnected']
    },
    cardsCollection: () => {
      return store.getters['pokedex/getCardsCollection']
    }
  },
  mounted() {
    store.dispatch('pokedex/getCardsCollection', this.userConnected.id)
  }
}

</script>

<style scoped>
div.body {
  background-color: #fff !important;
  height: 100vh !important;
  width: 100vw !important;
  overflow: hidden;
}

div.body p {
  color: #222222 !important;
  margin: 0 0;
}

main {
  height: 100%;
  width: 100%;
  margin: 0 0;
  padding:0 0;
  display: flex;
}

div.profile-details {
  width: 20%;
  height: 80%;
  margin: 2% 2%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  min-width: 200px;
}

img.picture {
  border-radius: 5px;
}

.first-last-names {
  display: flex;
}

.first-last-names p:nth-child(1) {
  margin-right: 20px;
}

.stats {
  height: 35%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.content {
  min-width: 70%;
}

.content h3 {
  text-align: center;
  width: 100%;
  color: #d32f2f !important;
  margin-top: 20px;
}
</style>
