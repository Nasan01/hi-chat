<script>

  import apiFetch from "../../config/axiosConfig"
  import { mapGetters } from "vuex"
  import socket from "../../config/socketConfig"
  import ChatContaint from "./ChatContaint.vue"
  import api_backend_url from "../../config/hostConfig"

  export default {
    components: {
      ChatContaint
    },
    created() {
      this.$watch(() => this.$route.params, (toParams, previousParams) => {
        this.fetchOneUserToChat(toParams.id);
        this.fetchMessage(this.$route.params.id);
        this.setLastMessage();
      });
    },
    mounted() {
      this.fetchOneUserToChat(this.$route.params.id);
      this.fetchMessage(this.$route.params.id);
      this.setLastMessage();
    },
    data() {
      return {
        userToChat: {},
        messages: [],
        body: "",
        lastMessage: "",
        api_backend_url
      };
    },
    methods: {
      async fetchOneUserToChat(idUserToChat) {
        try {
          const res = await apiFetch.get("/api/v1/user/" + idUserToChat, {
            headers: {
              Authorization: this.getToken
            }
          });
          this.userToChat = res.data[0];
          console.log(this.userToChat);
        }
        catch (error) {
          console.log(error);
        }
      },
      async fetchMessage(idUserToChat) {
        try {
          const res = await apiFetch.get("/api/v1/message/conversation/message/" + idUserToChat, {
            headers: {
              Authorization: this.getToken
            }
          });
          this.messages = res.data;
        }
        catch (error) {
          console.log(error);
        }
      },
      onPostMessage(e) {
        apiFetch.post("/api/v1/message/private", {
          to: this.$route.params.id,
          body: this.body
        }, {
          headers: {
            Authorization: this.getToken
          }
        }).then((res) => {
          this.setLastMessage();
        });
      },
      setLastMessage() {
        socket.on("messages", (data) => {
          this.lastMessage = data;
        });
      }
    },
    computed: {
      ...mapGetters([
          "getToken"
      ])
    },
    watch: {
      lastMessage() {
        this.fetchMessage(this.$route.params.id);
      },
    },
    
  }

</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="h-16 p-3 bg-gray-100 flex justify-between items-center">
      <img 
        :src="api_backend_url + '/images/' + userToChat.picture" 
        :alt="userToChat.fullname" 
        class="h-12 w-12 rounded-full border-2 border-indigo-400"
      />
      <h4 class="font-semibold">{{ userToChat.fullname }} </h4>
      <div class="h-2 w-2 bg-green-500 rounded-full"></div>
    </div>
    <div>
      <ChatContaint :messages="messages" />
    </div>
    <div class="h-16 p-3 bg-gray-100">
      <form class="flex" @submit.prevent="onPostMessage">
        <p class="text-indigo-400 py-3">
          <i class="fa fa-smile"></i>
        </p>
        <input 
          class="px-4 py-3 w-full mx-2 rounded-full outline-none text-gray-700"
          type="text" 
          name="body" 
          v-model="body"
          id="body"
          placeholder="Type a message here"
          required
        />
        <button class="px-4 py-3 rounded-full text-gray-100 bg-indigo-400">
          <i class="fa fa-paper-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>
