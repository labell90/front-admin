import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth_Login from "@/views/auth/Auth_Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path : '/login',
      name : 'auth_login',
      component : Auth_Login
    }




  ]
})

export default router
