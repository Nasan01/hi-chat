import { createRouter, createWebHistory } from 'vue-router'

import SignIn from '../components/auth/SignIn.vue'
import SignUp from '../components/auth/SignUp.vue'
import Home from "../components/Home.vue"
import Hello from '../components/Hello.vue'
import ChatContainer from '../components/chat/ChatContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth/signin", component: SignIn },
    { path: "/auth/signup", component: SignUp },
    { path: "/", component: Home, children: [
      { path: "", component: Hello },
      { path: "/chat/:id", component: ChatContainer },
    ]},
  ]
})

export default router
