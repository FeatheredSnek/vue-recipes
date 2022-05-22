<template>
  <div>
    <nav class="fixed w-full h-16 md:h-20 bg-white border-b border-b-gray-200 z-10">

      <!-- mobile header with openable search-->
      <div class="md:hidden max-w-7xl mx-auto px-5 flex items-center justify-between h-16 text-gray-600">
        <!-- hamburger/close minimenu button -->
        <button @click="mobileOpen()" class="w-12 h-12 flex items-center justify-center shrink-0 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
          <svg v-if="!mobileOpened" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- central logo -->
        <div 
          ref="logo"
          class="transitioning font-bold h-12 shrink-0 rounded-lg flex items-center justify-center"
        >
          <nuxt-link :to="{ name: 'index' }">
            <img src="../assets/icons/logo-icon.svg" class="sm:hidden block h-10"/>
            <img src="../assets/icons/logo-full.svg" class="sm:block hidden h-10"/>
          </nuxt-link>
        </div>
        <!-- search open button -->
        <button 
          ref="searchbutton"
          @click="searchOpen()" 
          class="transitioning w-12 h-12 flex shrink-0 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500" 
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <!-- search bar - visible on search open click -->
        <div ref="searchbar" class="transitioning hidden">
          <SearchBar 
            :focused="searchFocus" 
            class="ml-2"
          />
        </div>
      </div>

      <!-- desktop (lg+) header with menu -->
      <div class="hidden md:flex max-w-7xl mx-auto px-5 justify-between items-center h-20 text-gray-600">
        <nuxt-link 
          :to="{ name: 'index' }" 
          class="font-bold h-20 px-6 rounded-lg flex items-center justify-center"
        >
          <img src="../assets/icons/logo-icon.svg" class="lg:hidden block h-10"/>
          <img src="../assets/icons/logo-full.svg" class="lg:block hidden h-10"/>
        </nuxt-link>
        <div class="h-full flex justify-between items-center place-items-end">
          <NavbarLink route-name="favorites">
            Favorites
          </NavbarLink>
          <NavbarLink route-name="about">
            About us
          </NavbarLink>
          <a href="https://github.com/FeatheredSnek/vue-recipes/" target="_blank" class="hover:bg-gray-600 text-gray-600 hover:text-gray-100 font-bold w-32 h-12 px-6 rounded-lg flex items-center justify-center">
            GitHub
          </a>
          <SearchBar :focused="searchFocus" />
        </div>
      </div>

      <!-- mobile openable menu -->
      <Transition name="menu">
        <div v-if="mobileOpened" class="bg-white">
          <NavbarMobileLink route-name="index">
            Favorites
          </NavbarMobileLink>
          <NavbarMobileLink route-name="about">
            About us
          </NavbarMobileLink>
          <a href="https://github.com/FeatheredSnek/vue-recipes/" target="_blank" class="border-b border-gray-200 block py-4 text-center font-bold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
            GitHub
          </a>
        </div>
      </Transition>
    </nav>

  </div>
</template>

<script>
import NavbarMobileLink from "@/components/NavbarMobileLink.vue"
import SearchBar from '@/components/SearchBar.vue'
import NavbarLink from "@/components/NavbarLink.vue"

export default {
  name: "TheNavbar",
  components: { 
    NavbarMobileLink,
    SearchBar,
    NavbarLink
  },
  data() {
    return {
      mobileOpened: false,
      searchFocus: false,
      topbarSearchShow: false,
    }
  },
  methods: {
    // cant use transitions due to wonky flex element placement
    // so its a direct hack with refs, works like a champ tho
    searchOpen() {
      if (this.topbarSearchShow) return // prevents multiple calls (doubleclick etc.)
      this.topbarSearchShow = true
      this.$refs.searchbar.style.opacity = 0
      this.$refs.searchbutton.style.opacity = 0
      this.$refs.logo.style.opacity = 0
      setTimeout(() => {
        this.$refs.searchbutton.style.display = 'none'
        this.$refs.logo.style.display = 'none'
      }, 300);
      setTimeout(() => {
        this.$refs.searchbar.style.display = 'block'
      }, 300);
      setTimeout(() => {
        this.$refs.searchbar.style.opacity = 1
        this.searchFocus = true
      }, 330);
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
    },
  }
}
</script>

<style scoped>
.transitioning {
  transition: opacity .5s;
}

.menu-enter-active, .menu-leave-active {
  transition: opacity .5s;
}
.menu-enter, .menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>