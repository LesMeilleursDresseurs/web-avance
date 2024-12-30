<template>
  <div class="modal-backdrop" @click="handleBackdropClick">
    <div class="modal" @click.stop>
      <header class="modal-header">
        <button type="button" class="btn-close" @click="close">
          <img src="../assets/img/close.png" alt="close" class="button-close-img" />
        </button>
      </header>

      <section class="modal-body">
        <div class="left-section">
          <CardAnimation3d
            v-if="!isSmallScreen"
            class="card-image3D"
            :imgSrc="card.image + `/high.png`"
          />
          <img v-else class="card-image" :src="card.image + `/low.png`" alt="Card Image" />
        </div>
        <div class="right-section">
          <h1>{{ card.name }}</h1>
          <div class="card-info">
            <span v-if="card.category === 'Pokemon'" class="badge-default">HP : {{ card.hp }}</span>
            <span class="badge-default">Rarity : {{ card.rarity }}</span>
            <span v-if="card.illustrator" class="badge-default"
              >Illustrator : {{ card.illustrator }}</span
            >
          </div>
          <div v-if="card.category === 'Pokemon'" class="card-type">
            <h2>Type</h2>
            <span v-for="type in card.types" :key="type" :style="getBadgeTypeStyle(type)">
              {{ type }}
            </span>
          </div>

          <div v-if="card.weaknesses" class="card-weakness">
            <h2>Weaknesses</h2>
            <span
              v-for="(weakness, index) in card.weaknesses"
              :key="weakness.type"
              :style="getBadgeTypeStyle(weakness.type.toLowerCase())"
            >
              {{ weakness.type }}
            </span>
          </div>
          <div v-if="card.description" class="card-description">
            <h2>Story</h2>
            <p>{{ card.description }}</p>
          </div>
          <div class="card-version">
            <h2>Versions</h2>
            <div class="card-variants">
              <span v-for="(value, key) in card.variants">
                <span v-if="value === true" :style="getBadgeVariantStyle(key)">
                  <span :class="{ 'badge-child-holo': key === 'holo' }">{{ key }}</span>
                </span>
              </span>
            </div>
          </div>
          <div
            v-if="
              card.evolveFrom &&
              card.stage !== 'MEGA' &&
              card.stage !== 'VSTAR' &&
              card.stage !== 'VMAX'
            "
            class="card-evolvefrom"
          >
            <h2>Evolve From</h2>
            <div class="evolution-pokemon">
              <div class="evolve-from">
                <section :style="getBackgroundColor(childPokemon.type)" class="pokemon-section">
                  <img :src="childPokemon.image" :alt="childPokemon.name" class="pokemon-img" />
                </section>
                <div class="details-pokemon">
                  <p>{{ card.evolveFrom }} #{{ childPokemon.id }}</p>
                </div>
              </div>
              <div class="evolution-line"></div>
              <div class="initial-pokemon">
                <section :style="getBackgroundColor(initialPokemon.type)" class="pokemon-section">
                  <img :src="initialPokemon.image" :alt="initialPokemon.name" class="pokemon-img" />
                </section>
                <div class="details-pokemon">
                  <p>{{ card.name }} #{{ initialPokemon.id }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer v-if="card.dexId && otherCards !== {}" class="modal-footer">
        <Accordion title="Others cards" :other-cards="otherCards"> </Accordion>
      </footer>
    </div>
  </div>
</template>
<script>
import { colors } from '@/constants/constants'
import CardAnimation3d from '@/components/CardAnimation3d.vue'
import Accordion from './Accordion.vue'
export default {
  data() {
    return {
      initialPokemon: Object,
      childPokemon: Object,
      otherCards: [],
      isSmallScreen: false,
    }
  },
  name: 'Modal',
  props: {
    card: Object,
  },
  components: {
    CardAnimation3d,
    Accordion,
  },
  watch: {
    card: {
      handler(card) {
        if (card.category === 'Pokemon') {
          console.log(card)
          if (card && card.dexId) {
            this.fetchInitialPokemon(card.dexId[0])
            if (
              card &&
              card.evolveFrom &&
              card.stage !== 'MEGA' &&
              card.stage !== 'VSTAR' &&
              card.stage !== 'VMAX'
            ) {
              this.fetchEvolvePokemon(card.evolveFrom)
            }
          }
        }
        this.fetchOtherCards(card.name)
      },
      immediate: true,
    },
  },
  mounted() {
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWindowSize)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleBackdropClick(event) {
      if (event.target === this.$el) {
        this.close()
      }
    },
    checkWindowSize() {
      this.isSmallScreen = window.innerWidth < 768
    },
    async fetchInitialPokemon(pokemonId) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const pokemon = await response.json()
        this.initialPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default || '',
          type: pokemon.types[0].type.name || 'normal',
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
      }
    },
    async fetchEvolvePokemon(evolveFrom) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${evolveFrom.toLowerCase()}`,
        )
        const pokemon = await response.json()
        this.childPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default || '',
          type: pokemon.types[0].type.name || 'normal',
        }
        console.log(pokemon)
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
      }
    },
    async fetchOtherCards(name) {
      if (name) {
        for (let i = 0; i < name.length; i++) {
          if (name[i] === ' ') {
            name = name.replace(' ', '%20')
          }
          if (name[i] === '&') {
            name = name.replace('&', '%26')
          }
          if (name[i] === "'") {
            name = name.replace("'", '%27')
          }
        }
      }
      console.log('name', name)
      try {
        const response = await fetch(
          `https://api.tcgdex.net/v2/en/cards?name=${name}&category=Pokemon`,
        )
        const data = await response.json()
        if (data.length === 1) {
          this.otherCards = []
          return
        }
        this.otherCards = [...data]

        console.log('data', data)
        console.log('otherCards', this.otherCards)
      } catch (error) {
        console.error('Error :', error)
      }
    },
    getBadgeTypeStyle(type) {
      const color = colors.type[type.toLowerCase()]
      return {
        backgroundColor: color,
        color: 'white',
        padding: '0.5vh 0.5vh',
        borderRadius: '20px',
        margin: '0 0.5vw',
      }
    },
    getBadgeVariantStyle(variant) {
      if (variant !== 'holo') {
        const color = colors.variant[variant]
        return {
          padding: '0.5vh 0.5vh',
          borderRadius: '20px',
          margin: '0 0.5vw',
          border: `2px solid ${color}`,
          backgroundColor: 'transparent',
        }
      }
      return {
        padding: '0.5vh 0vw',
        border: '3px solid transparent',
        borderRadius: '20px',
        margin: '0 0.5vw',
        background:
          'linear-gradient(90deg, rgba(255, 69, 69, 1) 0%, rgba(251, 163, 72, 1) 12%, rgba(242, 244, 81, 1) 23%, rgba(181, 255, 84, 1) 33%, rgba(118, 243, 186, 1) 46%, rgba(99, 184, 248, 1) 56%, rgba(153, 150, 249, 1) 70%, rgba(252, 169, 248, 1) 84%, rgba(255, 125, 152, 1) 93%, rgba(255, 69, 69, 1) 100%)',
      }
    },
    getBackgroundColor(type) {
      console.log('type', type)
      const color = colors.type[type]
      return {
        borderRadius: '360px',
        border: `3px solid ${color}`,
        background: `radial-gradient(circle, ${color}, rgba(255, 255, 255, 0) 70%)`,
      }
    },
  },
}
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-y: auto;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  margin: 2vh 3vw;
}

.modal-header {
  display: flex;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  display: flex;
  flex-direction: row;
  padding: 20px 0;
}
.left-section,
.right-section {
  display: flex;
  justify-content: space-around;
}

.left-section {
  border-right: 1px solid #ddd;
  padding: 0 1vw;
}

.left-section img {
  max-height: 100%;
  height: 60vh;
}

.right-section {
  display: flex;
  flex-direction: column;
  margin: 0 3vw;
}
.right-section h1 {
  font-size: 2em;
  font-weight: bold;
  margin-left: 0;
  margin-bottom: 1rem;
}
.right-section h2 {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1vh;
}
.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: #ff6b6b;
  border: none;
  cursor: pointer;
  padding: 0;
}

.button-close-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.badge-default {
  padding: 0.5vh 0.5vh;
  background-color: #d2d1c1;
  border: 3px solid transparent;
  border-radius: 20px;
  margin: 0 0.5vw;
}

.badge-child-holo {
  padding: 0.5vh 0.5vh;
  margin: 0;
  background-color: white;
  border-radius: 15px;
  border: 1px solid transparent;
  width: calc(100% - 1px);
}

.evolution-pokemon {
  display: flex;
  align-items: center;
  padding: 1vh 0;
}

.evolution-line {
  width: 10vw;
  height: 0;
  border-bottom: 2px dashed #d2d1c1;
  z-index: 0;
}
.pokemon-section {
  max-width: 100%;
  max-height: 100%;
  width: 10vw;
  height: 10vw;
}
.pokemon-img {
  max-width: 100%;
  max-height: 100%;
  width: 10vw;
  height: 10vw;
  image-rendering: pixelated;
}
.details-pokemon {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
    padding: 20px 10px;
  }

  .left-section,
  .right-section {
    border: none;
    padding: 0;
    margin: 0;
  }

  .left-section {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  .right-section {
    margin-top: 20px;
  }

  .left-section img {
    max-height: 100%;
    height: 60vh;
  }
}
</style>
