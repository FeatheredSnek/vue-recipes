<template>
  <div>
    <h2>{{ header }}</h2>
    <RecipeSmallPreview
      v-for="recipe in recipes"
      :key="recipe.friendly_id"
      :name="recipe.name"
      :blurb="recipe.blurb"
      :friendly-id="recipe.friendly_id"
    />
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
    const apiURL = this.$props.exclude ? 
      `${this.$config.apiBaseURL}/more.php?current=${this.$props.count}&count=${this.$props.count}` :
      `${this.$config.apiBaseURL}/more.php?count=${this.$props.count}`
    let apiResponse = await this.$http.$get(apiURL)
    this.recipes = apiResponse
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    exclude: {
      type: String,
      required: false,
      default: ''
    },
    header: {
      type: String,
      required: false,
      default: 'More recipes'
    }
  }
}
</script>

<style scoped>

</style>