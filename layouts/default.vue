<template>
  <div class="text-gray-600">
    <AppNavbar />tso
      <div class="w-full max-w-7xl min-h-screen flex flex-col mx-auto px-5 pt-20 sm:pt-24 lg:pt-28 ">
        <Nuxt />
      </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue"
import AppFooter from "@/components/AppFooter.vue"

export default {
  name: "LayoutDefault",
  components: {
    AppNavbar, 
    AppFooter
  }
}
</script>

<style>

</style>
