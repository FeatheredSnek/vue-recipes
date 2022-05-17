<template>
  <div>
    <nav class="fixed w-full h-16 md:h-20 bg-white border-b border-b-gray-200 z-10">

      <!-- mobile header with openable search-->
      <div class="md:hidden max-w-7xl mx-auto px-2 flex items-center justify-between h-16 text-gray-600">
        <button @click="mobileOpen()" class="w-12 h-12 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
          <svg v-if="!mobileOpened" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nuxt-link 
          :to="{ name: 'index' }" 
          v-if="!topbarSearchShow"
          class="font-bold h-12 rounded-lg flex items-center justify-center"
        >
          <img src="../assets/icons/logo-icon.svg" class="sm:hidden block h-10"/>
          <img src="../assets/icons/logo-full-3.svg" class="sm:block hidden h-10"/>
        </nuxt-link>
        <button @click="searchOpen()" v-if="!topbarSearchShow" class="w-12 h-12 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500" >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <Transition name="search">
          <SearchBarTop v-if="topbarSearchShow" :focused="searchFocus" />
        </Transition>
      </div>

      <!-- desktop (lg+) header with menu -->
      <div class="hidden md:flex max-w-7xl mx-auto px-8 justify-between items-center h-20 text-gray-600">
        <nuxt-link 
          :to="{ name: 'index' }" 
          class="font-bold h-20 px-6 rounded-lg flex items-center justify-center"
        >
          <!-- <img src="../assets/icons/logo-icon.svg" class="lg:hidden block h-10"/> -->
          <!-- <img src="../assets/icons/logo-full-3.svg" class="lg:block hidden h-10"/> -->
                    <span class="hidden sm:inline">SM</span> -
                    <span class="hidden md:inline">MD</span> - 
                    <span class="hidden lg:inline">LG</span> - 
                    <span class="hidden xl:inline">XL</span>
        </nuxt-link>
        <div class="h-full flex justify-between items-center place-items-end">
          <AppNavbarLink route-name="index">
            Favorites
          </AppNavbarLink>
          <AppNavbarLink route-name="index">
            Browse
          </AppNavbarLink>
          <AppNavbarLink route-name="index">
            About us
          </AppNavbarLink>
          <SearchBarTop :focused="searchFocus" />
        </div>
      </div>

      <!-- mobile openable menu -->
      <Transition name="menu">
        <div v-if="mobileOpened" class="bg-white">
          <MenuItem :route-name="index">
            Favorites
          </MenuItem>
          <MenuItem :route-name="index">
            Browse
          </MenuItem>
          <MenuItem :route-name="index">
            About us
          </MenuItem>
        </div>
      </Transition>
    </nav>
    <!-- <div class="h-14 bg-slate-400">&nbsp;</div> -->
  </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue"
import SearchBarTop from '@/components/SearchBarTop.vue'
import AppNavbarLink from "@/components/AppNavbarLink.vue"

export default {
  name: "AppNavbar",
  components: { 
    MenuItem,
    SearchBarTop,
    AppNavbarLink
  },
  data() {
    return {
      mobileOpened: false,
      searchFocus: false,
      topbarSearchShow: false,
    }
  },
  methods: {
    searchOpen() {
      console.log('searchopen');
      this.topbarSearchShow = true
      // wait for next tick to let v-if render the input element
      this.$nextTick(() => this.searchFocus = true)
    },
    mobileOpen() {
      if (this.mobileOpened) {
        this.mobileOpened = false
        this.topbarSearchShow = false
        this.searchFocus = false
      }
      else {
        this.mobileOpened = true
      }
    }
  }
}
</script>

<style scoped>
.menu-enter-active, .menu-leave-active {
  transition: opacity .5s;
}
.menu-enter, .menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.search-enter-active, .search-leave-active {
  transition: opacity .5s;
}
.search-enter, .search-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>