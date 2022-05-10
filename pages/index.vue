<template>
  <div>
    <div class="welcome">
      Hero welcome
    </div>
    <div 
      class="loading" 
      v-if="$fetchState.pending"
    >
      Loading
    </div>
    <div 
      class="error" 
      v-else-if="$fetchState.error"
    >
      Error
    </div>
    <div 
      class="content" 
      v-else
    >
      <h1>Featured recipe</h1>
      <RecipeBigPreview
        :name="featuredRecipe.name"
        :blurb="featuredRecipe.blurb"
        :flags="featuredRecipe.flags"
        :friendly-id="featuredRecipe.friendly_id"
      />
      <hr/>
      <PreviewContainer
        :count="2"
        header="check out these"
      />
    </div>
  </div>
</template>

<script>
import RecipeBigPreview from "@/components/RecipeBigPreview.vue"
import PreviewContainer from "@/components/PreviewContainer.vue"

export default {
  name: 'IndexPage',
  components: {
    RecipeBigPreview,
    PreviewContainer
  },
  data() {
    return {
      featuredRecipe: null,
      moreRecipes: []
    }
  },
  async fetch() {
    const featuredURL = `${this.$config.apiBaseURL}/featured.php`
    let featuredData = await this.$http.$get(featuredURL)
    this.featuredRecipe = featuredData
  }
}
</script>
