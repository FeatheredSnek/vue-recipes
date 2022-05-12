<template>
  <!-- TODO fetch state messages -->
  <div>
    <div>
      <h1>{{ recipeData.name }}</h1>
      <div>
        <span v-if="recipeData.flags.vegan">Vegan</span> - 
        <span v-if="recipeData.flags.vegetarian">Vegetarian</span> - 
        <span v-if="recipeData.flags.maindish">Suitable for a main dish</span> - 
        <span v-if="recipeData.flags.hot">Can be served hot</span>
      </div>
      <img :src="$imagepath('recipe', recipeData.image)"/>
      <hr/>
      <h2>Ingredients:</h2>
      <ul>
        <li v-for="ingredient in ingredientsArray">
          {{ ingredient }}
        </li>
      </ul>
      <hr/>
      <h2>Preparation:</h2>
      <p>{{ recipeData.instructions }}</p>
      <p>
        <span>
          Prep time: {{ recipeData.prepTime }}  
        </span>
        <span>
          Servings: {{ recipeData.servings }}
        </span>
      </p>
    </div>

    <hr />
    
    <WriterSmallPreview
      v-if="recipeData.writerId"
      :id="recipeData.writerId"
    />
    
    <hr />
    
    <PreviewContainer
      header="Some other recipes to try"
      :custom-url="customUrl"
    />
  </div>
</template>

<script>
import PreviewContainer from "@/components/PreviewContainer.vue"
import WriterSmallPreview from "@/components/WriterSmallPreview.vue"

export default {
  name: "RecipePage",
  components: {
    WriterSmallPreview,
    PreviewContainer
  },
  watch: {
    '$route.params.id': '$fetch'
  },
  data() {
    return {
      pies: 'john_cook',
      id: this.$route.params.id,
      recipeData: {
        name: '',
        blurb: '',
        flags: {},
        ingredients: '',
        instructions: '',
        image: '',
        prepTime: 0,
        servings: 0,
        writerId: ''
      }
    };
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/recipe.php?friendly_id=${this.$route.params.id}`;
    let apiResponse = await this.$http.$get(apiURL);
    this.recipeData.name = apiResponse.name
    this.recipeData.blurb = apiResponse.blurb
    this.recipeData.flags = apiResponse.flags
    this.recipeData.ingredients = apiResponse.ingredients
    this.recipeData.instructions = apiResponse.instructions
    this.recipeData.prepTime = apiResponse.prep_time
    this.recipeData.servings = apiResponse.servings
    this.recipeData.image = apiResponse.image
    this.recipeData.writerId = apiResponse.writer_friendly_id
  },
  computed: {
    customUrl() {
      const base = this.$config.apiBaseURL
      const count = 3
      return `${base}/more.php?current=${this.id}&count=${count}`
    },
    ingredientsArray() {
      return this.recipeData.ingredients.split(';')
    },
  }
}
</script>

<style scoped>
</style>