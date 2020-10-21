<template>
  <div class="app">
    <sidebar v-if="$route.name !== 'Editor' && $route.name !== '404 Not Found'"></sidebar>
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/layout/Sidebar'

export default {
  components: {
    Sidebar,
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.axios.get('/articles')
        .then((response) => {
          this.$store.commit('articles:set', response.data.payload)
          if (response.data.payload.length) {
            this.$store.commit('articles:setCurrent', response.data.payload[0])
          }
        }).catch((err) => {
          console.error(`[App] Error fetching articles: ${err}`)
        })
    }
  }
}
</script>

<style lang="scss">
.app {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
}
</style>
