<script>

  import api_backend_url from "../../config/hostConfig"

  export default {
    props: ["messages"],
    
    data() {
      return {
        api_backend_url
      }
    },
  }

</script>

<template>
  <div class="overflow-scroll p-5" :class="$store.state.theme.theme.bg2" style="height: calc(100vh - 128px);">
    <div v-for="m in messages" :key="m._id" class="">
      <div v-if="m.from === $route.params.id" class="flex justify-start items-center overflow-clip">
        <img 
          :src="api_backend_url + '/images/' + m.fromObj[0].picture"
          class="h-9 w-9 border border-indigo-400 rounded-full m-1"
          alt=""
        >
        <p 
          class="text-left bg-gray-300 px-2 text-gray-700 py-4 rounded-3xl m-1" 
          style="max-width: 50%;"
        >
          {{ m.body }}
        </p>
      </div>
      <div v-else class="flex justify-end overflow-clip text-right">
        <p 
          class="text-right bg-indigo-400 text-gray-50 px-2 py-4 rounded-3xl m-1" 
          style="max-width: 50%;"
        >
          {{ m.body }}
        </p>
      </div>
    </div>
  </div>
</template>
