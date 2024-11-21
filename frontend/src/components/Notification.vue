<template>
  <div class="notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="{ good: notification.good }"
    >
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'

export default {
  name: 'NotificationComponent',
  data() {
    return {
      closing: false,
    }
  },
  computed: {
    notifications: () => {
      return store.getters['notification/getNotifications']
    },
  },
}
</script>

<style scoped>
.notification-container {
  position: absolute;
  right: 7px;
  top: 70px;
  height: auto;
  width: 25%;
  max-height: 60vh;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
}

.notification {
  width: 100%;
  height: 50px;
  background: rgba(205, 102, 102, 0.9);
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 3px;
}

.notification.good {
  background: rgba(152, 201, 120, 0.9);
}

@keyframes notif-appear {
  0% {
    top: -30%;
  }
  100% {
    top: 70px;
  }
}

.notification.close {
  animation: notif-disappear 0.3s forwards;
}

@keyframes notif-disappear {
  0% {
    top: 70px;
  }
  100% {
    top: -30%;
  }
}

.notification p {
  color: white;
  text-align: center;
  margin: 0 0;
}

.notification img {
  cursor: pointer;
  width: 27px;
  height: 27px;
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
