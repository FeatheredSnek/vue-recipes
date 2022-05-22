  <!-- TODO meta (ogp, fb, insta, twitter, pinterest)-->
  <!-- TODO images alts -->
  <!-- TODO filenames refactor -->
  <!-- TODO build ready -->
<template>
  <div class="text-gray-600">
    <!-- {{ bomb }} -->
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
  },
  computed: {
    // bomb() {
    //   return `${process.env.BASE_URL} - ${process.env.API_URL} - ${process.env.CDN_URL}` //eslint-disable-line
    // }
  }
}
</script>

<style>

</style>
