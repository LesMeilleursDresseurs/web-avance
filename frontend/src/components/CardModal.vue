<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <div class="left-section">
          <img :src="card.image + `/high.png`" alt="Card Image" />
        </div>
        <div class="right-section">
          <h1>{{ card.name }} #{{ initialPokemon.id }}</h1>
          <div class="card-info">
            <span class="badge-default">HP : {{ card.hp }}</span>
            <span class="badge-default">Rarity : {{ card.rarity }}</span>
          </div>
          <div class="card-type">
            <h2>Type</h2>
            <span v-for="type in card.types" :key="type" :style="getBadgeTypeStyle(type)">
              {{ type }}
            </span>
          </div>

          <div class="card-weakness">
            <h2>Weaknesses</h2>
            <span
              v-for="(weakness, index) in card.weaknesses"
              :key="weakness.type"
              :style="getBadgeTypeStyle(weakness.type.toLowerCase())"
            >
              {{ weakness.type }}
            </span>
          </div>
          <div class="card-description">
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
          <div v-if="card.evolveFrom" class="card-evolvefrom">
            <h2>Evolve From</h2>
            <div class="evolution-pokemon">
              <div class="evolve-from">
                <section :style="getBackgroundColor(childPokemon.type)">
                  <img :src="childPokemon.image" :alt="childPokemon.name" class="card-img" />
                </section>
                <div class="details-pokemon">
                  <h3>{{ card.evolveFrom }} #{{ childPokemon.id }}</h3>
                </div>
              </div>
              <div class="evolution-line"></div>
              <div class="initial-pokemon">
                <section :style="getBackgroundColor(initialPokemon.type)">
                  <img :src="initialPokemon.image" :alt="initialPokemon.name" class="card-img" />
                </section>
                <div class="details-pokemon">
                  <h3>{{ card.name }} #{{ initialPokemon.id }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <slot name="footer"> This is the default footer! </slot>
        <Accordion title="Others Cards of "> Contenu de la section 1 </Accordion>
        <button type="button" class="btn-green" @click="close">Close Modal</button>
      </footer>
    </div>
  </div>
</template>
<script>
import { colors } from '@/constants/constants'
import Accordion from './Accordion.vue'
export default {
  data() {
    return {
      initialPokemon: Object,
      childPokemon: Object,
    }
  },
  name: 'Modal',
  props: {
    card: Object,
  },
  components: {
    Accordion,
  },
  watch: {
    card: {
      handler(card) {
        console.log(card)
        if (card && card.name) {
          this.fetchInitialPokemon(card.name)
        }
        if (card && card.evolveFrom) {
          this.fetchEvolvePokemon(card.evolveFrom)
        }
        if (card && card.name) {
          this.fetchOthersCard(card.name)
        }
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async fetchInitialPokemon(pokemonName) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
        )
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
    async fetchOthersCard(name) {
      try {
        const response = await fetch(
          `https://api.tcgdex.net/v2/en/cards?name=${name}&category=Pokemon`,
        )
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
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
        background: `radial-gradient(circle, ${color}, rgba(255, 255, 255, 0) 60%)`,
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
  margin:;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  margin: 2vh 2vw;
}

.modal-header,
.modal-footer {
  padding: 1vh 2vw;
  display: flex;
}

.modal-header {
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
  margin-bottom: 1rem;
}
.right-section h2 {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1vh;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
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
  transform: translateY(-50%);
  z-index: 0;
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
