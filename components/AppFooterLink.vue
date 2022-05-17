<template>
  <nuxt-link 
    :to="{ name: routeName }" 
    class="hover:bg-gray-600 text-gray-600 hover:text-gray-100 font-bold w-32 h-12 px-6 rounded-lg flex items-center justify-center"
  >
  
  <!-- focus:outline-none focus:ring-2 focus:ring-inset -->
    <slot></slot>
  </nuxt-link>
</template>
<script>
export default {
  name: "AppFooterLink",
  props: {
    routeName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>