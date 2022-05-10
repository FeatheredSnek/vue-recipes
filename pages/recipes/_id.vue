<template>
  <div>
    <RecipeDetails
      :id="id"
    />
    <PreviewContainer
      :count="3"
      :exclude="id"
      header="Some more to try"
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
}
</script>

<style scoped>
</style>