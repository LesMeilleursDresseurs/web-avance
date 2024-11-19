<template>
  <h1>{{ id }}</h1>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define props using defineProps
defineProps({
  id: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped></style>
