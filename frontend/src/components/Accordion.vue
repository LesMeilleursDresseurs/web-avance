<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggle">
      <span>{{ isOpen ? '⯆' : '▲ ' }}</span>
    </div>
    <div class="accordion-body" v-if="isOpen">
      <div class="other-cards">
        <img
          v-for="card in otherCards"
          :key="card.id"
          :src="card.image + `/low.png`"
          :alt="card.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    otherCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.accordion {
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}
.accordion-header {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  background-color: #d2d1c1;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
  margin: 0 40vw;
}
.accordion-body {
  padding: 15px;
  border-top: 1px solid #ddd;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
