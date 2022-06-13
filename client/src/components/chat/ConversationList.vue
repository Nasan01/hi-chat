<script>

  import apiFetch from "../../config/axiosConfig"
  import { mapGetters } from "vuex"
  import { RouterLink } from "vue-router"
  import api_backend_url from "../../config/hostConfig"
  import socket from "../../config/socketConfig"

  export default {

    data() {
      return {
        conversations: [],
        api_backend_url,
        newConversation: "",
      }
    },

    computed: {
      ...mapGetters([
        "getToken",
        "getId",
      ])
    },

    methods: {
      async fetchConversations() {
        const res = await apiFetch.get("/api/v1/message/conversations", {
          headers: {
            Authorization: this.getToken
          }
        })
        this.conversations = res.data
        console.log(this.conversations)
      },

      handleRecipient(recipients) {
        for (let i = 0; i < recipients.length; i++) {
          if(recipients[i]._id !== this.getId) {
            return recipients[i]
          }
        }
        return null
      },

      setLastMessage() {
        socket.on("messages", (data) => this.newConversation = data)
      },

      spliceLastMessage(messages) {
        return messages.length <= 16 ? messages : messages.slice(0, 16) + "..."
      }

    },

    mounted() {
      this.fetchConversations()
      this.setLastMessage()
    },

    watch: {
      newConversation() {
        this.fetchConversations()
      }
    },

  }

</script>

<template>
  <div class="flex flex-col" style="min-height: 80vh;">
    <div v-for="r in conversations" :key="r._id">
      <RouterLink :to="'/chat/' + handleRecipient(r.recipientObj)._id" class="h-20 flex p-5">
        <img 
          :src="api_backend_url + '/images/' + handleRecipient(r.recipientObj).picture" 
          :alt="r.fullname" 
          class="h-16 w-16 rounded-full border-2 border-indigo-400"
        />
        <div class="w-4/5">
          <h3 class="m-2 h-4 rounded font-semibold text-lg" :class="$store.state.theme.theme.text">{{ handleRecipient(r.recipientObj).fullname }}</h3>
          <p class="m-2 h-3 rounded-md" :class="$store.state.theme.theme.text2">
            {{  spliceLastMessage(r.lastMessage)}}
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
