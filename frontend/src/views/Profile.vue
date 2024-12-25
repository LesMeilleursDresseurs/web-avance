<template>
  <div class="body">
    <MenuTopBar />
    <main>
      <div class="profile-details">
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
        <p><strong>Email: </strong>{{ userConnected.email }}</p>
        <div class="first-last-names">
          <p
            v-if="
              userConnected.firstname !== undefined &&
              userConnected.firstname !== null &&
              userConnected.firstname !== ''
            "
          >
            {{ userConnected.firstname }}
          </p>
          <p
            v-if="
              userConnected.lastname !== undefined &&
              userConnected.lastname !== null &&
              userConnected.lastname !== ''
            "
          >
            {{ userConnected.lastname }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="general-chart">
          <Doughnut :data="genralChart()" :options="chartOptions" />
        </div>
        <div class="grid">
          <PokemonCard :card="card" v-for="card in cardsCollection" :key="card.id" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import MenuTopBar from '@/components/MenuTopBar.vue'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Colors} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import store from '@/store'
import PokemonCard from "@/components/Card.vue";

ChartJS.register(ArcElement, Tooltip, Legend, Colors)

export default {
  name: 'ProfilePage',
  components: {PokemonCard, MenuTopBar, Doughnut },
  data() {
    return {
      nbCardsWorld: 1200,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  computed: {
    userConnected: () => {
      return store.getters['login/getUserConnected']
    },
    cardsCollection: () => {
      console.log(store.getters['pokedex/getCardsCollection'])
      return store.getters['pokedex/getCardsCollection']
    },
  },
  async mounted() {
    await store.dispatch('pokedex/loadCardsCollection', this.userConnected.id)
  },
  methods: {
    genralChart() {
      return {
        labels: ['Your cards', 'Other cards'],
        datasets: [
          {
            Colors,
            data: [this.cardsCollection.length, this.nbCardsWorld]
          }
        ]
      }
    }
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
  height: calc(100% - 50px);
  width: 100%;
  margin: 0 0;
  display: flex;
  align-items: center;
  padding: 15px 0 10px 0;
}

div.profile-details {
  padding: 3% 3%;
  width: 24%;
  height: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 15%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  min-width: 200px;
  border-radius: 5px 5px;
  margin-right: 15px;
  margin-left: 15px;
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

.content {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: transparent;
}
/* Add a thumb */
::-webkit-scrollbar-thumb {
  background: #ff6f61;
  border-radius: 20px;
}

.general-chart {
  width: 50%;
  height: auto;
}

.grid {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
</style>
