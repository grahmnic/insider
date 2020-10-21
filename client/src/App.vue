<template>
  <div class="app">
    <topbar></topbar>
    <sidebar v-if="$route.name !== 'Editor' && $route.name !== '404 Not Found'"></sidebar>
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/layout/Sidebar'
import Topbar from '@/layout/Topbar'

export default {
  components: {
    Sidebar,
    Topbar
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
