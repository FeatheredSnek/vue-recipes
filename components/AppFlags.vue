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
      <img src="@/assets/icons/vegan.svg" class="h-6 w-6" alt="vegan"/>
    </AppFlagsIcon>
    <AppFlagsIcon 
      v-if="flags.vegetarian" 
      hint-text="Vegetarian"
      :hint-status="hintDisplayStatus.vegetarian" 
      @flagclick="toggleHints('vegetarian')"
    >
      <img src="@/assets/icons/vegetarian.svg" class="h-6 w-6" alt="vegetarian"/>
    </AppFlagsIcon>
    <AppFlagsIcon 
      v-if="flags.maindish" 
      hint-text="Main dish"
      :hint-status="hintDisplayStatus.maindish" 
      @flagclick="toggleHints('maindish')"
    >
      <img src="@/assets/icons/maindish.svg" class="h-6 w-6" alt="main dish"/>
    </AppFlagsIcon>
    <AppFlagsIcon 
      v-if="flags.hot" 
      hint-text="Serve hot"
      :hint-status="hintDisplayStatus.hot" 
      @flagclick="toggleHints('hot')"
    >
      <img src="@/assets/icons/hot.svg" class="h-6 w-6" alt="served hot"/>
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