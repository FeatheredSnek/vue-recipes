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
        :flags="recipeFlagsObject"
        :friendly-id="featuredRecipe.friendly_id"
      />
      <hr/>
      <h1>More recipes</h1>
      <RecipeSmallPreview
        v-for="recipe in moreRecipes"
        :key="recipe.friendly_id"
        :name="recipe.name"
        :blurb="recipe.blurb"
        :friendly-id="recipe.friendly_id"
      />
    </div>
  </div>
</template>

<script>
import RecipeBigPreview from "@/components/RecipeBigPreview.vue"
import RecipeSmallPreview from "@/components/RecipeSmallPreview.vue"

export default {
  name: 'IndexPage',
  components: {
    RecipeBigPreview,
    RecipeSmallPreview
  },
  data() {
    return {
      featuredRecipe: null,
      moreRecipes: []
    }
  },
  async fetch() {
    const featuredURL = `${this.$config.apiBaseURL}/featured.php`
    const moreRecipesURL = `${this.$config.apiBaseURL}/more.php?count=3`
    let featuredData = await this.$http.$get(featuredURL)
    let moreRecipesData = await this.$http.$get(moreRecipesURL)
    this.featuredRecipe = featuredData.recipe
    this.moreRecipes = moreRecipesData.recipes
  },
  computed: {
    recipeFlagsObject() {
      const flagsObject = {
        vegan: this.featuredRecipe.flag_vegan,
        vegetarian: this.featuredRecipe.flag_vegetarian,
        hot: this.featuredRecipe.flag_hot,
        maindish: this.featuredRecipe.flag_maindish
      }
      return flagsObject
    }
  }
}
</script>
