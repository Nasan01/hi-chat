<script>
export default {
  props: ["messages"],
}
</script>

<template>
  <div class="overflow-scroll" style="height: calc(100vh - 128px);">
    <div v-for="m in messages" :key="m._id" class="">
      <div v-if="m.from === $route.params.id" class="flex justify-start overflow-clip">
        <p 
          class="text-left bg-gray-300 px-2 text-gray-700 py-4 rounded-3xl m-1" 
          style="max-width: 50%;"
        >
          {{ m.body }}
        </p>
      </div>
      <div v-else class="flex justify-end overflow-clip text-right">
        <p 
          class="text-right bg-indigo-400 text-gray-50 px-2 py-4 rounded-full m-1" 
          style="max-width: 50%;"
        >
          {{ m.body }}
        </p>
      </div>
    </div>
  </div>
</template>
