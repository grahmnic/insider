<template>
  <div class="page-editor">
    <transition name="fade">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center p-4">
                <p class="text-muted m-0">{{!$route.params.id ? 'Creating' : 'Editing'}}</p>
                <div class="article-actions d-flex justify-content-end ">
                    <div v-if="!$route.params.id" class="mr-2" @click="addArticle">
                        <font-awesome-icon icon="save" />
                    </div>
                    <div v-else class="mr-2" @click="editArticle(current_article.id)">
                        <font-awesome-icon icon="save" />
                    </div>
                    <div @click="deleteArticle(current_article.id)">
                        <font-awesome-icon icon="trash-alt" />
                    </div>
                </div>
            </div>
            <div class="article p-4">
                <input class="editor-title" placeholder="title" v-model="article.title">
                <input class="subtitle text-muted m-0">Created by {{article.author}}</p>
                <p class="subtitle text-muted m-0">Published at {{article.publication_date | moment("dddd, MMMM Do YYYY LTS")}}</p>
                <p class="subtitle text-muted m-0">Last updated {{article.updatedAt | moment("dddd, MMMM Do YYYY LTS")}}</p>
                <p class="my-4">{{article.body}}</p>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Editor',
    computed: {
        ...mapGetters([
            'articles'
        ]),
    }, 
    data() {
        return {
            article: {
                title: '',
                publication_date: null,
                author: '',
                body: '',
                updatedAt: null
            }
        }
    },
    created() {
        if (this.$route.params.id) {
            Object.assign(
                this.article,
                this.articles.find(article => article.id === parseInt(this.$route.params.id))
            )
        }
    },
    methods: {
        addArticle() {

        },
        editArticle(id) {

        }
    }
}
</script>

<style lang="scss">
.page-editor {
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
</style>