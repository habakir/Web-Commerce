import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Kolekcija from '../views/Kolekcija.vue'
import Narudzbina from '../views/Narudzbina.vue'
import Prijava from '@/views/Prijava.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/kolekcija/:id',
    name: 'kolekcija',
    component: Kolekcija
  },
  {
    path: '/narudzbine',
    name: 'narudzbine',
    component: Narudzbina
  },
  {
    path: '/prijavi-promenu',
    name: 'Prijava',
    component: Prijava
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
