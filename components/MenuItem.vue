<template>
  <nuxt-link 
    :to="{ name: routeName }" 
    class="border-b border-gray-200 block py-4 text-center font-bold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500"
  >
    <slot></slot>
  </nuxt-link>
</template>
<script>
export default {
  name: "MenuItem",
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