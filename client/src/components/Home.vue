<script>

  import { mapGetters } from "vuex"
  import { RouterView } from "vue-router"
  import ConversationList from "./chat/ConversationList.vue"
  import Profile from "./user/Profile.vue"
  import ChatContainer from "./chat/ChatContainer.vue"

  export default {

    components: {
      ConversationList,
      Profile,
      ChatContainer
    },

    created() {
      if(!this.isLogged) {
        this.$router.push("/auth/signin")
      }
    },

    computed: {
      ...mapGetters([
        "getName",
        "isLogged"
      ])
    },
  
  }

</script>

<template>
  <div class="md:grid md:grid-cols-4">
    <div class="md:col-span-1 md:flex md:flex-col bg-gray-100 h-screen">
      <h1 class="text-center text-2xl text-indigo-400 p-3"> 
        <i class="fas fa-message"></i> hi-chaty <i class="fa fa-message"></i> 
      </h1>
      <div class="overflow-scroll scroll-m-0">
        <Suspense>
          <ConversationList />
          <template #fallback>
            <div v-for="n in 5" :key="n" class="h-20 flex p-5">
              <div class="h-16 w-16 rounded-full bg-gray-300"></div>
              <div class="w-4/5">
                <h3 class="m-2 h-4 rounded-md bg-gray-300"></h3>
                <p class="m-2 h-3 rounded-md bg-slate-300"></p>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
    <div class="md:col-span-2">
      <RouterView />
    </div>
    <div class="md:col-span-1 md:flex md:flex-col md:items-center h-screen bg-gray-100">
      <Suspense>
        <Profile />
        <template #fallback>
          <div class="flex flex-col h-screen justify-around">
            <div class="text-center text-gray-500"><p>MY ACCOUNT</p></div>
            <div>
              <div class="w-44 h-44 rounded-full bg-gray-200"></div>
              <h2 class="h-4 m-4 rounded-md bg-gray-200"></h2>
            </div>
            <div class="text-center">
              <button class="text-gray-500">
                <i class="fa fa-sign-out"></i> Logout
              </button>
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
