<template>
  <div class="sidebar py-4">
      <div class="px-4 mb-4">
        <input class="search" placeholder="Search" type="text" v-model="input"/>
      </div>
      <p class="d-flex align-items-center text-uppercase font-weight-bold text-muted px-4 my-1">
          Articles
          <font-awesome-icon class="ml-2" icon="plus" @click="toEditor"/>
      </p>
    <transition-group class="articles" name="list-complete" tag="div">
        <div class="px-4 py-2 list-complete-item m-0" :class="{ 'active': current_article && article.id === current_article.id }" v-for="article in filteredArticles" :key="article.id" @click="setArticle(article.id)">
            {{article.title}}
        </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'sidebar',
    computed: {
        ...mapGetters([
            'articles',
            'current_article'
        ]),
        filteredArticles() {
            return this.articles.filter(article => new RegExp(this.input.trim(), 'gi').test(article.title))
        }
    },
    data() {
        return {
            input: ''
        }
    },
    methods: {
        setArticle(id) {
            this.$store.commit('articles:setCurrent', id)
        },
        toEditor() {
            this.$router.push({ name: 'Editor' })
        }
    },
}
</script>

<style lang="scss">
.sidebar {
    height: 100%;
    width: 15rem;
    border-right: 1px solid #c2c2c2;
    box-shadow: 4px 0 5px -2px #c2c2c2;
    background: rgb(250, 251, 252);
    position: fixed;
    font-size: 0.825rem;
    overflow-x: hidden;
    overflow-y: auto;

    .list-complete-item {
        transition: all 0.5s;
        display: inline-block;
        margin-right: 10px;
    }

    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .search {
        width: 100%;
        border: 1px solid #c2c2c2;
        border-radius: 6px;
        padding: 2px 6px;

        &:focus {
            outline-color: rgb(148, 148, 148);
        }
    }

    svg {
        height: 24px;
        min-width: 24px;
        padding: 6px;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
            background:  rgb(224, 226, 228);
        }
    }

    .articles {
        > * {
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
            cursor: pointer;
            &:hover {
                background: rgb(224, 226, 228);
            }
        }

        .active {
            border-right: 4px solid orange;
            background: rgba(224, 226, 228, 0.5);
        }
    }
}
</style>