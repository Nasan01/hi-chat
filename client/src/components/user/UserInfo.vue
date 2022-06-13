<script>

  import api_backend_url from '../../config/hostConfig'

  export default {
    props: ["name", "picture"],
    
    data() {
      return {
        api_backend_url
      }
    }
  }

</script>

<template>
  <div class="flex h-20 w-full p-3">
    <img 
      :src="api_backend_url + '/images/' + picture" 
      :alt="name" 
      class="h-16 w-16 rounded-full border-2 border-indigo-400"
    />
    <div class="w-4/5">
      <h3 class="m-2 h-4 rounded font-semibold">{{ name }}</h3>
    </div>
  </div>
</template>