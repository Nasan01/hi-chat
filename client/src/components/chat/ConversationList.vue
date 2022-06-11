<script>

  import apiFetch from "../../config/axiosConfig"
  import { mapGetters } from "vuex"
  import { RouterLink } from "vue-router"
  import api_backend_url from "../../config/hostConfig"

  export default {

    data() {
      return {
        conversations: [],
        api_backend_url
      }
    },

    computed: {
      ...mapGetters([
        "getToken"
      ])
    },

    methods: {
      async fetchUser() {
        const res = await apiFetch.get("/api/v1/user", {
          headers: {
            Authorization: this.getToken
          }
        })
        this.conversations = res.data
      },
    },

    mounted() {
      this.fetchUser()
    },

  }

</script>

<template>
  <div class="flex flex-col" style="min-height: 80vh;">
    <div v-for="u in conversations" :key="u._id">
      <RouterLink :to="'/chat/'+u._id" class="h-20 flex p-5">
        <img 
          :src="api_backend_url + '/images/' + u.picture" 
          :alt="u.fullname" 
          class="h-16 w-16 rounded-full border-2 border-indigo-400"
        />
        <div class="w-4/5">
          <h3 class="m-2 h-4 rounded font-semibold">{{ u.fullname }}</h3>
          <p class="m-2 h-3 rounded-md text-gray-600">Hello World</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
