import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleView.vue')
  },
  {
    path: '/editor/:id',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditorView.vue')
  }, {
    path: '/404',
    name: '404 Not Found',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }, {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
