<template>
  <!-- TODO fetch status v-if-else  -->
  <div>
    <div>
      <h1>{{ name }}</h1>
      <div>
        <span v-if="flags.vegan">Vegan</span> - 
        <span v-if="flags.vegetarian">Vegetarian</span> - 
        <span v-if="flags.maindish">Suitable for a main dish</span> - 
        <span v-if="flags.hot">Can be served hot</span>
      </div>
      <hr/>
      <h2>Ingredients:</h2>
      <ul>
        <li v-for="ingredient in ingredientsArray">
          {{ ingredient }}
        </li>
      </ul>
      <hr/>
      <h2>Preparation:</h2>
      <p>{{ instructions }}</p>
      <p>
        <span>
          Prep time: {{ prepTime }}  
        </span>
        <span>
          Servings: {{ servings }}
        </span>
      </p>
    </div>
    <hr/>
    <WriterSmallPreview
      :id="writerId"
    />
  </div>
</template>

<script>
import WriterSmallPreview from "@/components/WriterSmallPreview.vue";

export default {
  name: "RecipeDetails",
  components: {
    WriterSmallPreview
  },
  data() {
    return {
      name: '',
      blurb: '',
      flags: {},
      ingredients: [],
      instructions: '',
      prepTime: 0,
      servings: 0,
      writerId: ''
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/recipe.php?friendly_id=${this.$route.params.id}`;
    let apiResponse = await this.$http.$get(apiURL);
    this.name = apiResponse.name
    this.blurb = apiResponse.blurb
    this.flags = apiResponse.flags
    this.ingredients = apiResponse.ingredients
    this.instructions = apiResponse.instructions
    this.prepTime = apiResponse.prep_time
    this.servings = apiResponse.servings
    this.writerId = apiResponse.writer_friendly_id
  },
  computed: {
    ingredientsArray() {
      return this.ingredients.split(';')
    },
  },
}
</script>

<style scoped>
</style>