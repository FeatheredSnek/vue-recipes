<template>
  <footer class="w-full mt-auto ">
    <div class="w-full mt-12 bg-white border-t border-b-gray-200">
      <div class="max-w-7xl flex flex-col md:flex-row m-auto items-center justify-between py-12 px-5">
        <div class="flex mb-8 md:m-0">
          <a href="https://www.pinterest.com" target="_blank">
            <img src="../assets/icons/social/pinterest.svg" class="w-8 h-8 mr-3"/>
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img src="../assets/icons/social/instagram.svg" class="w-8 h-8 mx-3"/>
          </a>
          <a href="https://www.facebook.com" target="_blank">
            <img src="../assets/icons/social/facebook.svg" class="w-8 h-8 mx-3"/>
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <img src="../assets/icons/social/twitter.svg" class="w-8 h-8 mx-3"/>
          </a>
          <a href="https://www.tiktok.com" target="_blank">
            <img src="../assets/icons/social/tiktok.svg" class="w-8 h-8 mx-3"/>
          </a>
        </div>
        <nuxt-link :to="{ name: 'index' }" class="block">
          <img src="../assets/icons/logo-full.svg" class="h-8">
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
}
</script>

<style scoped>

</style>