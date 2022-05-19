<template>
  <div 
    class="absolute flex justify-end w-full rounded-full text-gray-600" 
    :class="{ 'p-4' : !noPad }"
  >
    <AppFlagsIcon 
      v-if="flags.vegan" 
      hint-text="Vegan"
      :hint-status="hintDisplayStatus.vegan" 
      @flagclick="toggleHints('vegan')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    </AppFlagsIcon>
    <AppFlagsIcon 
      v-if="flags.vegetarian" 
      hint-text="Vegetarian"
      :hint-status="hintDisplayStatus.vegetarian" 
      @flagclick="toggleHints('vegetarian')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    </AppFlagsIcon>
    <AppFlagsIcon 
      v-if="flags.maindish" 
      hint-text="Main dish"
      :hint-status="hintDisplayStatus.maindish" 
      @flagclick="toggleHints('maindish')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    </AppFlagsIcon>
    <AppFlagsIcon 
      v-if="flags.hot" 
      hint-text="Serve hot"
      :hint-status="hintDisplayStatus.hot" 
      @flagclick="toggleHints('hot')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    </AppFlagsIcon>
  </div>
</template>

<script>
import AppFlagsIcon from "@/components/AppFlagsIcon.vue"

export default {
  name: "AppFlags",
  components: {
    AppFlagsIcon
  },
  data() {
    return {
      hintDisplayStatus: {
        vegan: false,
        vegetarian: false,
        maindish: false,
        hot: false,
      }
    }
  },
  methods: {
    // on custom child click event because of vue2 limitation
    // of no @click directly on components
    toggleHints(hintName) {
      if (this.hintDisplayStatus[hintName] === true) {
        for (let field in this.hintDisplayStatus) {
          this.hintDisplayStatus[field] = false
        }
      }
      else {
        for (let field in this.hintDisplayStatus) {
          this.hintDisplayStatus[field] = false
        }
        this.hintDisplayStatus[hintName] = true
      }
    },
  },
  props: {
    flags: {
      type: Object,
      required: true,
      validator: (value) => {
        return true &&
          Object.hasOwn(value, 'vegan') &&
          Object.hasOwn(value, 'vegetarian') &&
          Object.hasOwn(value, 'maindish') &&
          Object.hasOwn(value, 'hot')
      },
      default: () => { return {} }
    },
    noPad: {
      type: Boolean,
      required: false
    },
  }
}
</script>

<style scoped>

</style>