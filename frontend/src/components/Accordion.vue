<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggle">
      <h3>{{ title }}</h3>
      <span>{{ isOpen ? '−' : '+' }}</span>
    </div>
    <div class="accordion-body" v-if="isOpen">
      <slot></slot>
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
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f7f7f7;
  cursor: pointer;
  font-weight: bold;
}
.accordion-body {
  padding: 15px;
  background-color: #fff;
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
