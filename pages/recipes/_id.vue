<template>
  <div>
    <RecipeDetails
      :id="id"
    />
    <PreviewContainer
      header="Some other recipes to try"
      :custom-url="customUrl"
    />
  </div>
</template>

<script>
import RecipeDetails from "@/components/RecipeDetails.vue"
import PreviewContainer from "@/components/PreviewContainer.vue"

export default {
  name: "RecipePage",
  components: {
    PreviewContainer,
    RecipeDetails
  },
  watch: {
    '$route.params.id': '$fetch'
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    customUrl() {
      const base = this.$config.apiBaseURL
      const count = 3
      return `${base}/more.php?current=${this.id}&count=${count}`
    }
  }
}
</script>

<style scoped>
</style>