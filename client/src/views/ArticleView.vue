<template>
  <div class="page-article">
    <transition name="fade">
      <div class="container" v-if="current_article">
        <div class="article-actions d-flex justify-content-end p-4">
          <router-link class="mr-2" :to="{ name: 'Editor', params: {id: current_article.id} }">
            <font-awesome-icon icon="pen" />
          </router-link>
          <div @click="deleteArticle(current_article.id)">
            <font-awesome-icon icon="trash-alt" />
          </div>
        </div>
        <div v-if="current_article" class="article p-4">
          <h1>{{current_article.title}}</h1>
          <p class="subtitle text-muted m-0">Created by {{current_article.author}}</p>
          <p class="subtitle text-muted m-0">Published at {{current_article.publication_date | moment("dddd, MMMM Do YYYY LTS")}}</p>
          <p class="subtitle text-muted m-0">Last updated {{current_article.updatedAt | moment("dddd, MMMM Do YYYY LTS")}}</p>
          <p class="my-4">{{current_article.body}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Article',
  computed: {
      ...mapGetters([
          'current_article'
      ]),
  },
  methods: {
    deleteArticle() {
      this.axios.delete(`/articles/${this.current_article.id}`)
        .then((response) => {
          this.$store.commit('articles:deleteCurrent', response.data.payload.id)
        }).catch((err) => {
          console.error(`[App] Error deleting article: ${err}`)
        })
    }
  }
}
</script>
<style lang="scss">
.page-article {
  padding-left: 15rem;

  .article-actions {
    > * {
      width: 32px;
      height: 32px;
      text-align: center;
      padding: 6px;
      border-radius: 6px;
      color: #007bff;
      cursor: pointer;
      &:hover {
        background: #007bff49;
      }
    }
  }

  .article {
    h1 {
      font-size: 2.5rem;
      font-weight: normal;
    }

    .subtitle {
      font-size: 0.875rem;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
