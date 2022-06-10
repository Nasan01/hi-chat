import { createRouter, createWebHistory } from 'vue-router'

import SignIn from '../components/auth/SignIn.vue'
import SignUp from '../components/auth/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth/signin", component: SignIn },
    { path: "/auth/signup", component: SignUp },
  ]
})

export default router
