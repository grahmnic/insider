import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    current_article: null
  },
  mutations: {
    'articles:set'(state, articles) {
      Vue.set(state, 'articles', articles)
    },
    'articles:setCurrent'(state, id) {
      const item = state.articles.find(item => item.id === id)
      Vue.set(state, 'current_article', item)
    },
    'articles:deleteCurrent'(state, id) {
      const index = state.articles.findIndex(item => item.id === id)
      Vue.set(state, 'current_article', null)
      if (index >= 0) {
        state.articles.splice(index, 1)
      }
    },
    'articles:upsertArticle'(state, article) {
      const item = state.articles.find(item => item.id === article.id)
      if (item) {
        Object.assign(
          item,
          article
        )
      } else {
        state.articles.push(article)
      }
    }
  },
  getters: {
    articles(state) {
      return state.articles
    },
    current_article(state) {
      return state.current_article
    }
  }
})
