<script>
import { RouterLink } from "vue-router"
import apiFetch from "../../config/axiosConfig"

  export default {
    data() {
      return {
        userInfo: {
          username: "",
          password: ""
        },
        error: "",
      }
    },

    computed: {
      disabledButton() {

        return (
          this.userInfo.username.length < 2 || this.userInfo.password.length < 6
        ) ? true : false
      },
    },

    methods: {
      onLogin(e) {
        apiFetch.post("/api/v1/user/signin", this.userInfo)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            this.error = error.response.data.msg
            console.log(error)
          })
      }
    },

  }
</script>

<template>
  <div class="min-h-screen md:grid md:grid-cols-3 bg-gray-200">
    <div class="md:col-span-2 md:flex md:flex-col bg-cyan-900 p-5">
      <h1 class="mx-3 text-gray-100 text-3xl"><RouterLink to="/">Tasks-Managing</RouterLink></h1>
      <img src="@/assets/svg/b06.svg" alt="signup" class="text-center" />
    </div>
    <div class="md:col-span-1 md:flex md:flex-col md:items-center md:justify-center">
      <div class="m-2 md:w-4/6">
        <h1 class="text-cyan-900 text-2xl text-center m-3">Login to your account</h1>
        <p class="text-center text-gray-600">and get connected !</p>
        <form class="mt-5" @submit.prevent="onLogin">
          <p class="text-red-500 text-sm ml-1 text-center">{{ error }}</p>
          <div class="mx-2 mt-4">
            <input 
              type="text" 
              name="usernameoremail" 
              id="usernameoremail" 
              placeholder="username or email"
              class="w-full pl-14 pr-3 py-3 rounded-full outline-none text-gray-600"
              v-model="userInfo.username"
              required
            />
          </div>
          <div class="flex justify-start">
            <p class="relative w-5 bottom-9 left-8 text-cyan-900"><i class="fa fa-user"></i></p>
          </div>
          <div class="mx-2">
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="password"
              class="w-full pl-14 pr-3 py-3 rounded-full outline-none text-gray-600"
              v-model="userInfo.password"
              required
            />
          </div>
          <div class="flex justify-start">
            <p class="relative w-5 bottom-9 left-8 text-cyan-900"><i class="fa fa-lock"></i></p>
          </div>
          <div class="mx-2 mb-5 text-gray-400">
            <input 
              type="checkbox" 
              name="rememberme" 
              id="rememberme" 
              class="pl-14 pr-3 py-3 ml-3 rounded-full outline-none m-2 checked:bg-cyan-900"
            />
            <label for="rememberme">Remember me</label>
          </div>
          <div class="mx-2 mb-5">
            <button 
              class="bg-cyan-900 px-3 py-3 text-gray-200 rounded-full w-full"
              :disabled="disabledButton"
              :class="[disabledButton && 'cursor-not-allowed opacity-80']"
            >LOGIN</button>
          </div>
          <div class="m-2 mt-5 text-center text-gray-400">
            <a href="#">Forgot your password ?</a><br> or 
            <RouterLink to="/auth/signup"><b>Sign Up</b></RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
