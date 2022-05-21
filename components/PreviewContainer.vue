<template>
  <div class="max-w-7xl mb-10">
    <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
    <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
    <div v-else>
      <h2 class="font-bold text-3xl text-gray-600 pb-4">
        {{ header }}
      </h2>
      <div class="grid md:grid-cols-3 gap-4 xl:gap-8">
        <RecipeSmallPreview
          v-for="recipe in recipes"
          :key="recipe.friendly_id"
          :name="recipe.name"
          :image="recipe.image"
          :writer="recipe.writer"
          :flags="recipe.flags"
          :friendly-id="recipe.friendly_id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeSmallPreview from "@/components/RecipeSmallPreview.vue"
import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"

export default {
  name: "PreviewContainer",
  components: {
    RecipeSmallPreview,
    AppFetchStateIndicator
  },
  data() {
    return {
      recipes: []
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/more.php?count=${this.$props.count}`
    if (this.$props.customUrl.length) {
      apiURL = this.$props.customUrl
    }
    let apiResponse = await this.$http.$get(apiURL)
    this.recipes = apiResponse
  },
  props: {
    header: {
      type: String,
      required: false,
      default: 'More recipes'
    },
    count: {
      type: Number,
      required: false,
      default: 3,
      validator: (value) => {
        return Number.isInteger(value / 3)
      }
    },
    customUrl: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>