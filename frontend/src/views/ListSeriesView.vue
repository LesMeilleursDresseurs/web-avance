<template>
  <div>
    <h1>Series</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="grid">
        <article
          v-for="serie in series"
          :key="serie.id"
          class="card"
          @click="viewSerieDetails(serie.id)"
        >
          <header>
            <h4>{{ serie.name }}</h4>
          </header>
          <footer>
            <div v-if="serie.logo">
              <img :src="serie.logo + `.png`" :alt="serie.name" class="card-img" />
            </div>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [],
      loading: true,
      error: null,
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://api.tcgdex.net/v2/en/series')
      if (!response.ok) {
        throw new Error('Error loading series')
      }
      const data = await response.json()
      this.series = data
    } catch (error) {
      this.error = error.message
    } finally {
      this.loading = false
    }
  },
}
</script>

<style>
h1 {
  text-align: center;
  margin: 1rem auto;
  font-size: 1.8vw;
}

header {
  margin-bottom: 0;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 3vw;
  padding: 0 1vw;
}
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  flex: 0 1 calc(20% - 2rem);
  box-sizing: content-box;
}
.card:hover {
  transform: scale(1.2);
}
.card header h4 {
  font-size: 1.4vw;
  margin-bottom: 0;
}

img.card-img {
  max-width: 100%;
  width: 10vw;
  image-rendering: pixelated;
}
</style>
