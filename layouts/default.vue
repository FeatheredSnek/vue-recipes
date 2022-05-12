<template>
  <div>
    <AppNavbar />
    <Nuxt />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue"
import AppFooter from "@/components/AppFooter.vue"

export default {
  components: AppNavbar, AppFooter
}
</script>

<style>
a {
  text-decoration: underline;
}
nuxt-link {
  text-decoration: underline;
}
img {
  width:100px;
  height:100px;
}
</style>
