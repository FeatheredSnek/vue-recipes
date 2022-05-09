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
      <div v-if="recipeApiCallSuccess">
        <RecipeDetails
          :name="recipeData.name"
          :writer-name="writerData != null ? writerData.name : ``"
          :blurb="recipeData.blurb"
          :instructions="recipeData.instructions"
          :ingredients="recipeIngredientsArray"
          :flags="recipeFlagsObject"
          :prep-time="recipeData.prep_time"
          :servings="recipeData.servings"
        />
        <WriterSmallPreview
          v-if="writerData"
          :name="writerData.name"
          :short-bio="writerData.short_bio"
          :friendly-id="writerData.friendly_id"
        />
        <WriterSmallPreview
          v-else
        />
      </div>
      <div v-else>
        No recipe found
      </div>
    </div>
    <div class="more">
      <h2>More recipes to check out</h2>
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
import RecipeSmallPreview from "@/components/RecipeSmallPreview.vue"
import WriterSmallPreview from "@/components/WriterSmallPreview.vue"
import RecipeDetails from "@/components/RecipeDetails.vue"

export default {
    name: "RecipePage",
    components: {
      RecipeSmallPreview,
      WriterSmallPreview,
      RecipeDetails
    },
    watch: {
      '$route.params.id': '$fetch'
    },
    data() {
      return {
          id: this.$route.params.id,
          recipeApiCallSuccess: true,
          recipeData: null,
          writerData: null,
          moreRecipes: []
      };
    },
    async fetch() {
      // get main recipe data
      let apiURL = `${this.$config.apiBaseURL}/recipe.php?friendly_id=${this.$route.params.id}`;
      let apiResponse = await this.$http.$get(apiURL);
      if (apiResponse.success) {
          this.recipeData = apiResponse.recipe;
          // get writer data if the recipe has a specified writer
          if (this.recipeData.writer_id) {
              apiURL = `${this.$config.apiBaseURL}/writer.php?id=${this.recipeData.writer_id}`;
              apiResponse = await this.$http.$get(apiURL);
              this.writerData = apiResponse.writer;
          }
      }
      // if theres no recipe set api error
      else {
          this.recipeApiCallSuccess = false;
      }
      // always get more recipe previews
      apiURL = `${this.$config.apiBaseURL}/more.php?current=${this.$route.params.id}&count=3`;
      apiResponse = await this.$http.$get(apiURL);
      if (apiResponse.success && apiResponse.recipes.length) {
          this.moreRecipes = apiResponse.recipes;
      }
    },
    computed: {
      // convert ingredients string to array
      recipeIngredientsArray() {
        if (this.recipeData.ingredients) {
          return this.recipeData.ingredients.split(';')
        }
        else {
          return []
        }
      },
      // convert individual flag values to a dictionary object
      recipeFlagsObject() {
        if (this.recipeData) {
          const flagsObject = {
            vegan: this.recipeData.flag_vegan,
            vegetarian: this.recipeData.flag_vegetarian,
            hot: this.recipeData.flag_hot,
            maindish: this.recipeData.flag_maindish
          }
          return flagsObject
        }
        else {
          return {
            vegan: false,
            vegetarian: false,
            hot: false,
            maindish: false
          }
        }
      }
    }
}
</script>

<style scoped>
</style>