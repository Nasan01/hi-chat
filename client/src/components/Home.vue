<script>

  import { mapGetters } from "vuex"

  export default {

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
  <h1>Welcome to hi-chaty {{ getName }}</h1>
</template>