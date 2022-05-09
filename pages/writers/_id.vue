<template>
  <div>
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
      <WriterDetails
        :name="writerData.name"
        :bio="writerData.long_bio"
        :socials="socialLinksObject"
        :badge="!!writerData.flag_badge"
      />
      <hr/>
      Writer's recipes
      <RecipeSmallPreview
        v-for="recipe in writerRecipes"
        :key="recipe.friendly_id"
        :name="recipe.name"
        :blurb="recipe.blurb"
        :friendly-id="recipe.friendly_id"
      />
    </div>
  </div>
</template>

<script>
import WriterDetails from "@/components/WriterDetails.vue"
import RecipeSmallPreview from "@/components/RecipeSmallPreview.vue"

export default {
  name: "WriterPage",
  components: {
    WriterDetails,
    RecipeSmallPreview
  },
  watch: {
    '$route.params.id': '$fetch'
  },
  data() {
    return {
      id: this.$route.params.id,
      writerData: null,
      writerRecipes: []
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/writer.php?friendly_id=${this.$route.params.id}`;
    let apiResponse = await this.$http.$get(apiURL);
    if (apiResponse.success) {
      this.writerData = apiResponse.writer
      this.writerRecipes = apiResponse.recipes
    }
  },
  computed: {
    socialLinksObject() {
      const linksObject = {
        facebook: this.writerData.social_fb,
        instagram: this.writerData.social_instagram,
        twitter: this.writerData.social_twitter,
        tiktok: this.writerData.social_tiktok
      }
      return linksObject
    }
  }
}
</script>

<style scoped>

</style>