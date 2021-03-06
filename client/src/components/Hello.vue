<script>

  import { mapGetters } from 'vuex'
  import { RouterLink } from 'vue-router'
  import socket from '../config/socketConfig'
  import apiFetch from '../config/axiosConfig'
  import UserInfo from './user/UserInfo.vue'
  import SearchInput from './user/SearchInput.vue'

  export default {

    components: {
      UserInfo,
      SearchInput,
    },

    data() {
      return {
        usersMembers: [],
        usernameToSearch: "",
        new_user: "",
      }
    },

    computed: {
      ...mapGetters([
        "getToken",
        "getId",
      ]),
      isEmptyUsers() {
        return this.usersMembers.length === 0 ? true : false
      },
    },

    mounted() {
      this.fetchUsersMembers()
      this.setNewUser()
    },

    watch: {
      new_user() {
        this.fetchUsersMembers()
      }
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

      async fetchUsersSearched(usernameToSearch) {
        const res = await apiFetch.get("/api/v1/user/name/" + usernameToSearch, {
          headers: {
            Authorization: this.getToken
          }
        })
        this.usersMembers = res.data
      },

      onSearchChange(usernameToSearch) {
        this.usernameToSearch = usernameToSearch
        if(this.usernameToSearch === "") {
          this.fetchUsersMembers()
        } else {
          this.fetchUsersSearched(this.usernameToSearch)
        }
      },

      setNewUser() {
        socket.on("new_user", (data) => {
          this.new_user = data
        })
      },
    }

  }

</script>
<template>
  <div class="h-screen class flex flex-col overflow-scroll" :class="$store.state.theme.theme.bg2">
    <div class="p-3">
      <SearchInput @username-to-search="onSearchChange" />
    </div>
    <div v-if="isEmptyUsers" class="flex flex-col items-center justify-center text-center h-4/5">
      <p :class="$store.state.theme.theme.text"><i class="fa fa-search-minus fa-5x"></i><br>No Users</p>
    </div>
    <div v-else>
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
  </div>
</template>
