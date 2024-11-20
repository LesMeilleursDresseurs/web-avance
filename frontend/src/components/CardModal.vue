<template>
  <div class="background">
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
            <h1>{{ card.name }} #{{ card.id }}</h1>
            <div class="card-info">
              <span class="badge-default">HP : {{ card.hp }}</span>
              <span class="badge-default">Rarity : {{ card.rarity }}</span>
            </div>
            <div class="card-type">
              <h2>Type</h2>
              <span v-for="type in card.types" :key="type" :class="getBadgeClass(type)">
                {{ type }}
              </span>
            </div>

            <div class="card-weakness">
              <h2>Weaknesses</h2>
              <span
                v-for="(weakness, index) in card.weaknesses"
                :key="weakness.type"
                :class="getBadgeClass(weakness.type)"
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
                  <span v-if="value === true" :class="getVariantClass(key)">
                    <span :class="{ 'badge-variant': key === 'holo' }">{{ key }}</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> This is the default footer! </slot>
          <button type="button" class="btn-green" @click="close">Close Modal</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    card: Object,
  },

  // async mounted() {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${card.evolveFrom}`)
  //   const data = await response.json()
  //   console.log(data)
  // },
  methods: {
    close() {
      this.$emit('close')
    },
    getBadgeClass(type) {
      switch (type) {
        case 'Fire':
          return 'badge-fire'
        case 'Water':
          return 'badge-water'
        case 'Grass':
          return 'badge-grass'
        case 'Electric':
          return 'badge-electric'
        case 'Psychic':
          return 'badge-psychic'
        case 'Darkness':
          return 'badge-darkness'
        case 'Fighting':
          return 'badge-fighting'
        case 'Metal':
          return 'badge-metal'
        case 'Dragon':
          return 'badge-dragon'
        case 'Fairy':
          return 'badge-fairy'
        case 'Colorless':
          return 'badge-colorless'
        default:
          return 'badge-default'
      }
    },
    getVariantClass(variant_key) {
      console.log(variant_key)
      switch (variant_key) {
        case 'holo':
          return 'badge-holo'
        case 'reverse':
          return 'badge-reverse'
        case 'firstEdition':
          return 'badge-firstEdition'
        case 'normal':
          return 'badge-normal'
        case 'wPromo':
          return 'badge-wPromo'
        default:
          return 'badge-default'
      }
    },
  },
}
</script>
<style>
.background {
  position: absolute;
  height: 100vh;
  width: 100vw;
}
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
}

.modal {
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  width: 90vw;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  display: flex;
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
  padding: 20px 10px;
}

.left-section,
.right-section {
  display: flex;
  justify-content: space-around;
}

.left-section {
  border-right: 1px solid #ddd;
  padding: 3vw;
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
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 1rem;
}
.right-section h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1vh;
}
.badge-fire,
.badge-water,
.badge-grass,
.badge-electric,
.badge-psychic,
.badge-darkness,
.badge-fighting,
.badge-metal,
.badge-dragon,
.badge-fairy,
.badge-colorless,
.badge-normal,
.badge-reverse,
.badge-wPromo,
.badge-firstEdition,
.badge-default {
  padding: 0.5vh 0.5vh;
  background-color: #d2d1c1;
  border: 3px solid transparent;
  border-radius: 20px;
  margin: 0 0.5vw;
}
.badge-fire {
  background-color: #f57d31;
}

.badge-water {
  background-color: #6493eb;
}

.badge-grass {
  background-color: #75cb48;
}
.badge-electric {
  background-color: #f9cf30;
}
.badge-psychic {
  background-color: #fb5584;
}
.badge-darkness {
  background-color: #75574c;
}
.badge-fighting {
  background-color: #c12239;
}
.badge-metal {
  background-color: #b7b9d0;
}
.badge-dragon {
  background-color: #7037ff;
}
.badge-fairy {
  background-color: #e69eac;
}
.badge-colorless {
  background-color: #aaa67f;
}
.badge-default {
  background-color: #d2d1c1;
}
.badge-variant {
  padding: 0.5vh 0.5vh;
  margin: 0;
  background-color: white;
  border-radius: 15px;
  border: 1px solid transparent;
  width: calc(100% - 1px);
}
.badge-normal {
  border: 2px solid #8d774f;
  background-color: transparent;
}

.badge-reverse {
  border: 2px solid #332f2f;
  background-color: transparent;
  transform: scale(-1, 1);
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
.badge-firstEdition {
  border: 2px solid #6493eb;
  background-color: transparent;
}
.badge-holo {
  padding: 0.5vh 0vw;
  border: 3px solid transparent;
  border-radius: 20px;
  margin: 0 0.5vw;
  background: rgb(255, 153, 69);
  background: linear-gradient(
    90deg,
    rgba(255, 69, 69, 1) 0%,
    rgba(251, 163, 72, 1) 12%,
    rgba(242, 244, 81, 1) 23%,
    rgba(181, 255, 84, 1) 33%,
    rgba(118, 243, 186, 1) 46%,
    rgba(99, 184, 248, 1) 56%,
    rgba(153, 150, 249, 1) 70%,
    rgba(252, 169, 248, 1) 84%,
    rgba(255, 125, 152, 1) 93%,
    rgba(255, 69, 69, 1) 100%
  );
}
.badge-wPromo {
  border: 2px solid #fb5584;
  background-color: transparent;
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
</style>
