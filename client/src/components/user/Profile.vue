<script>

  import { mapGetters, mapMutations } from "vuex"
  import api_backend_url from "../../config/hostConfig"
  import apiFetch from "../../config/axiosConfig"

  export default {

    data() {
      return {
        userConnected: {},
        api_backend_url,
      }
    },

    computed: {
      ...mapGetters([
        "getToken",
        "getId",
      ]),
    },

    mounted() {
      this.fetchUserConnected()
    },

    methods: {
      async fetchUserConnected() {
        try {
          const res = await apiFetch.get("/api/v1/user/" + this.getId, {
            headers: {
              Authorization: this.getToken
            }
          });
          this.userConnected = res.data[0];
        }
        catch (error) {
          console.log(error);
        }
      },
      ...mapMutations([
        "setLoggOut"
      ]),
      loggOut() {
        this.setLoggOut()
        this.$router.push("/auth/signin")
      }
    },

  }

</script>

<template>
  <div class="flex flex-col h-screen justify-around">
    <div class="text-center text-gray-500"><p>MY ACCOUNT</p></div>
    <div class="text-center">
      <img 
        :src="api_backend_url + '/images/' + userConnected.picture" 
        alt=""
        class="w-44 h-44 rounded-full border-4 border-indigo-400"
      />
      <h2 class="h-4 m-4 rounded-md">{{ userConnected.fullname }}</h2>
      <p class="text-gray-600"><i>@{{ userConnected.username }}</i></p>
    </div>
    <div class="text-center">
      <button class="text-gray-500" @click="loggOut">
        <i class="fa fa-sign-out"></i> Logout
      </button>
    </div>
  </div>
</template>