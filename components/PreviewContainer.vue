<template>
  <div>
    <div 
      v-if="$fetchState.pending"
      class="loading"
    >
      Loading data
    </div>
    <div 
      v-else-if="$fetchState.error"
      class="error"
    >
      Data loading error
    </div>
    <div v-else>
      <h2>{{ header }}</h2>
      <RecipeSmallPreview
        v-for="recipe in recipes"
        :key="recipe.friendly_id"
        :name="recipe.name"
        :image="recipe.image"
        :blurb="recipe.blurb"
        :friendly-id="recipe.friendly_id"
      />
    </div>
  </div>
</template>

<script>
import RecipeSmallPreview from '@/components/RecipeSmallPreview.vue'

export default {
  name: "PreviewContainer",
  components: {
    RecipeSmallPreview
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
      default: 3
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