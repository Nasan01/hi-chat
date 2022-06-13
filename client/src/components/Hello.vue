<script>

  import { mapGetters } from 'vuex'
  import { RouterLink } from 'vue-router'
  import UserInfo from './user/UserInfo.vue'
  import apiFetch from '../config/axiosConfig'

  export default {

    components: {
      UserInfo
    },

    data() {
      return {
        usersMembers: []
      }
    },

    computed: {
      ...mapGetters([
        "getToken",
        "getId",
      ]),
    },

    mounted() {
      this.fetchUsersMembers()
    },

    methods: {
      async fetchUsersMembers() {
        const res = await apiFetch.get("/api/v1/user", {
          headers: {
            Authorization: this.getToken
          }
        })
        this.usersMembers = res.data
      },
    }

  }

</script>
<template>
  <div class="h-screen class flex flex-col overflow-scroll">
    <div v-for="user in usersMembers" :key="user._id">
      <RouterLink :to="'/chat/' + user._id" class="h-20 flex p-5">
        <Suspense>
          <UserInfo :name="user.fullname" :picture="user.picture" />
          <template #fallback>
            <div class="h-20 flex p-5">
              <div class="h-16 w-16 rounded-full bg-gray-300"></div>
              <div class="w-4/5">
                <h3 class="m-2 h-4 rounded-md bg-gray-300"></h3>
                <p class="m-2 h-3 rounded-md bg-slate-300"></p>
              </div>
            </div>
          </template>
        </Suspense>
      </RouterLink>
    </div>
  </div>
</template>
