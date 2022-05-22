<template>
  <div class="text-gray-600">
    <TheNavbar />
      <div class="w-full max-w-7xl min-h-screen flex flex-col mx-auto px-5 pt-20 sm:pt-24 lg:pt-28 ">
        <Nuxt />
      </div>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue"
import TheFooter from "@/components/TheFooter.vue"

export default {
  name: "LayoutDefault",
  components: {
    TheNavbar, 
    TheFooter
  },
}
</script>

<style>

</style>
