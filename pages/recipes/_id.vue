<template>
  <div>
    <!-- TODO merge details component with this page as its not used anywhere else??? -->
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
      // `${this.$config.apiBaseURL}/more.php?count=${this.$props.count}`
      // return `${base}/more.php?current=${this.id}&count=${count}`
      return `${base}/more.php?count=${count}`
    }
  }
}
</script>

<style scoped>
</style>