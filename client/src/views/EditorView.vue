<template>
  <div class="page-editor">
    <transition name="fade">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center p-4">
                <p class="text-muted m-0">{{!$route.params.id ? 'Creating' : 'Editing'}}</p>
                <div class="article-actions d-flex justify-content-end ">
                    <div v-if="!$route.params.id" class="mr-2" @click="addArticle" :class="{'disabled': !canSave}">
                        <font-awesome-icon icon="save" />
                    </div>
                    <div v-else class="mr-2" @click="editArticle($route.params.id)" :class="{'disabled': !canSave}">
                        <font-awesome-icon icon="save" />
                    </div>
                    <router-link :to="{ path: '/' }">
                        <font-awesome-icon icon="times" />
                    </router-link>
                </div>
            </div>
            <div class="article p-4">
                <div class="editor-title" :class="{'error': !titleCheck}">
                    <b-form-textarea
                        class="article-input"
                        v-model="article.title"
                        placeholder="Title"
                        rows="2"
                        max-rows="20"
                        on-resize
                        maxlength="50"
                    ></b-form-textarea>
                    <span class="input-count">{{article.title.length}} / {{titleMax}}</span>
                </div>
                <div class="editor-author" :class="{'error': !authorCheck}">
                    <b-form-input 
                        class="article-input mt-2 mb-4" 
                        placeholder="Author" 
                        v-model="article.author" 
                        maxlength="50"/>
                    <span class="input-count">{{article.author.length}} / {{authorMax}}</span>
                </div>
                <div class="editor-body" :class="{'error': !bodyCheck}">
                    <b-form-textarea
                        class="article-input my-4"
                        v-model="article.body"
                        placeholder="Body"
                        rows="3"
                        max-rows="20"
                        maxlength="1000"
                        on-resize
                    ></b-form-textarea>
                    <span class="input-count">{{article.body.length}} / {{bodyMax}}</span>
                </div>
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
            'articles',
        ]),
        titleCheck() {
            return this.article.title.length && this.article.title.length <= this.titleMax
        },
        authorCheck() {
            return this.article.author.length && this.article.author.length <= this.authorMax
        },
        bodyCheck() {
            return this.article.body.length && this.article.body.length <= this.bodyMax
        },
        canSave() {
            return this.titleCheck && this.authorCheck && this.bodyCheck
        }
    }, 
    data() {
        return {
            article: {
                title: '',
                author: '',
                body: '',
            },
            titleMax: 50,
            authorMax: 50,
            bodyMax: 1000,
        }
    },
    mounted() {
        if (this.$route.params.id) {
            Object.assign(
                this.article,
                this.articles.find(article => article.id === parseInt(this.$route.params.id))
            )
        }
    },
    methods: {
        addArticle() {
            if (this.canSave) {
                this.axios.post('/articles', {
                    payload: {
                        title: this.article.title,
                        author: this.article.author,
                        body: this.article.body
                    }
                })
                .then((response) => {
                    this.$store.commit('articles:upsertArticle', response.data.payload)
                    this.$store.commit('articles:setCurrent', response.data.payload.id)
                    this.$router.push({ name: 'Article' })
                }).catch((err) => {
                    console.error(`[App] Error creating article: ${err}`)
                })
            }
        },
        editArticle(id) {
            if (this.canSave) {
                this.axios.post(`/articles/${id}`, {
                    payload: this.article
                })
                .then((response) => {
                    this.$store.commit('articles:upsertArticle', response.data.payload)
                    this.$store.commit('articles:setCurrent', response.data.payload.id)
                    this.$router.push({ name: 'Article' })
                }).catch((err) => {
                    console.error(`[App] Error editing article: ${err}`)
                })
            }
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

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
  }

  .article {
    > * {
        position: relative;
    }

    .article-input {
        position: relative;
        font-size: inherit;
        color: black;
        overflow: hidden !important;
    }
    
    .error {
        textarea, input {
            outline-color: red;
            border-color: red;
            &:focus {
                box-shadow: 0 0 0 0.2rem rgba(red, 0.25);
            }
        }
        .input-count {
            color: red;
        }
    }

    .input-count {
        position: absolute;
        font-size: 0.75rem;
        right: 0;
        bottom: -1.25rem;
    }

    .editor-title {
        font-size: 2.5rem;
        display: block;
        width: 100%;
    }

    .editor-author {
        font-size: 0.875rem;
        display: block;
        width: 20rem;
    }

    .editor-body {
        font-size: 0.875rem;
        display: block;
        width: 100%;
    }
  }
}
</style>