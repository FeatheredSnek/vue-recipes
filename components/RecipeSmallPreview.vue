<template>
  <div 
    @click="navigate()" 
    tabindex=0 
    class="block max-w-md w-full mx-auto bg-white rounded-xl mb-4 md:m-0 overflow-hidden md:max-w-7xl border border-gray-200 shadow-xl shadow-gray-100 cursor-pointer"
  >
    <!-- image with flag icons -->
    <div>
      <div class="relative w-full">
        <AppFlags :flags="flags"/>
      </div>
      <img 
        class="h-48 w-full object-cover" 
        :src="$imagepath('recipeth', image)"
        alt="Man looking at item at a store"
      >
    </div>
    <!-- text data: name and writer name (if exists) -->
    <div class="p-6">
      <p class="text-2xl leading-tight font-bold text-gray-600">{{ name }}</p>
      <p v-if="writer" class="text-lg text-lime-500 ">
        by <span class="font-bold">{{ writer }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import AppFlags from "@/components/AppFlags.vue"

  export default {
    name: "RecipeSmallPreview",
    components: {
      AppFlags
    },
    methods: {
      navigate() {
        this.$router.push(
          {
            name: 'recipes-id', 
            params: {id: this.$props.friendlyId}
          }
        )
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      blurb: {
        type: String,
        required: true
      },
      friendlyId: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      writer: {
        type: String,
        required: false
      },
      flags: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>