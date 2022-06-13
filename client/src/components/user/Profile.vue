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
    <div class="text-center" :class="$store.state.theme.theme.text"><p>MY ACCOUNT</p></div>
    <div class="text-center">
      <img 
        :src="api_backend_url + '/images/' + userConnected.picture" 
        alt=""
        class="w-44 h-44 rounded-full border-4 border-indigo-400"
      />
      <h2 class="h-4 m-4 rounded-md text-xl" :class="$store.state.theme.theme.text">{{ userConnected.fullname }}</h2>
      <p :class="$store.state.theme.theme.text2"><i>@{{ userConnected.username }}</i></p>
    </div>
    <div class="text-center">
      <label for="switchTheme" :class="$store.state.theme.theme.text">
        <input 
          type="checkbox" 
          name="switchTheme" 
          id="switchTheme"
          class="mine"
          @change="$store.commit('switchTheme')"
        /> <span class="check"></span>&nbsp;&nbsp;&nbsp; Switch Theme
      </label>
    </div>
    <div class="text-center">
      <button :class="$store.state.theme.theme.text" @click="loggOut">
        <i class="fa fa-sign-out"></i> Logout
      </button>
    </div>
  </div>
</template>