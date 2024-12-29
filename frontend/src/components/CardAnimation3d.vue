<template>
  <div class="container">
    <div
      class="card"
      ref="card"
      @mousemove="handleMouseMove"
      @mouseout="handleMouseOut"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="content-card">
        <img :src="imgSrc" alt="Placeholder" />
      </div>
      <div class="glow" :style="{ opacity: isHovered ? 1 : 0 }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardAnimation3d',
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    }
  },
  methods: {
    handleMouseMove(e) {
      const card = this.$refs.card
      const elRect = card.getBoundingClientRect()
      const x = e.clientX - elRect.x
      const y = e.clientY - elRect.y

      const midCardWidth = elRect.width / 2
      const midCardHeight = elRect.height / 2

      const angleY = -(x - midCardWidth) / 8
      const angleX = (y - midCardHeight) / 8

      const glowX = (x / elRect.width) * 100
      const glowY = (y / elRect.height) * 100

      const contentCard = card.querySelector('.content-card')
      const glow = card.querySelector('.glow')

      contentCard.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) scale(1)`
      glow.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) scale(1)`
      glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(184,196,211),transparent)`
    },
    handleMouseOut() {
      const card = this.$refs.card
      const contentCard = card.querySelector('.content-card')
      const glow = card.querySelector('.glow')

      contentCard.style.transform = `rotateY(0deg) rotateX(0deg)`
      glow.style.transform = `rotateY(0deg) rotateX(0deg)`
    },
    handleMouseEnter() {
      this.isHovered = true
      const card = this.$refs.card
      card.style.transition = 'none'
    },
    handleMouseLeave() {
      this.isHovered = false
      const card = this.$refs.card
      card.style.transition = 'all 0.5s ease'
      card.style.transform = `rotateY(0deg) rotateX(0deg)`
      this.handleMouseOut()
    },
  },
}
</script>

<style scoped>
.container {
  position: relative;
  padding: 1vh;
}
.card {
  perspective: 1000px;
}
.card:hover {
  z-index: 10;
}
.content-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.15s ease-out;
}
.content-card img {
  max-width: 100%;
  max-height: 100%;
  width: 25vw;
}

.glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.15s ease-out;
  mix-blend-mode: hard-light;
  background: radial-gradient(circle at 50% 0%, rgba(184, 196, 211), transparent);
  border-radius: 25px;
  opacity: 0;
  pointer-events: none;
}
</style>
