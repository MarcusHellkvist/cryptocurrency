import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Popular from '../views/Popular.vue'
import Wallet from '../views/Wallet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search/:coin',
    name: 'Search',
    component: Home
  },
  {
    path: '/popular',
    name: 'Popular',
    component: Popular
  },
  {
    path: '/wallet/:userName?',
    name: 'Wallet',
    component: Wallet
  }
]

const router = new VueRouter({
  routes
})

export default router
