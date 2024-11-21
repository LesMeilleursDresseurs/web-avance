<template>
  <RouterView />
  <notification />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import notification from '@/components/Notification.vue'
</script>

<style>
body,
html {
  margin: 0 0;
  padding: 0 0;
}
</style>
