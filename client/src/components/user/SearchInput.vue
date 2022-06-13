<script>

  export default {

    emits: ["usernameToSearch"],

    data() {
      return {
        searchUser: ""
      }
    },

    methods: {
      onSearchChange(e) {
        this.$emit("usernameToSearch", this.searchUser)
      }
    },

  }

</script>

<template>
  <div>
    <div class="mx-2 mt-4">
      <input 
        type="text" 
        name="searchUser" 
        id="searchUser" 
        placeholder="Type an username to search..."
        class="w-full pl-14 pr-3 py-3 rounded-full outline-none text-gray-600 bg-gray-200"
        v-model="searchUser"
        @change="onSearchChange"
        required
      />
    </div>
    <div class="flex justify-start">
      <p class="relative w-5 bottom-9 left-8 text-indigo-400"><i class="fa fa-search"></i></p>
    </div>
  </div>
</template>
