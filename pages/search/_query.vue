<template>
  <div>
    <div 
      v-if="$fetchState.pending"
      class="loading"
    >
      Loading data
    </div>
    <div 
      v-else-if="$fetchState.error"
      class="error"
    >
      Data loading error
    </div>
    <div v-else>
      <div>
        <h2>ELELELELAdvanced search parameters = {{ debugIsPiesUrl }}</h2>
        <div>
          <label for="query"></label>
          <input 
            type="text" 
            id="query" 
            v-model="params.query"
          />
        </div>
        <div>
          <label for="vegan">vegan</label>
          <input 
            type="checkbox"
            id="vegan"
            v-model="params.vegan"
          />
        </div>
        <div>
          <label for="vegetarian">vegetarian</label>
          <input 
            type="checkbox"
            id="vegetarian"
            v-model="params.vegetarian"
          />
        </div>
        <div>
          <label for="maindish">maindish</label>
          <input 
            type="checkbox"
            id="maindish"
            v-model="params.maindish"
          />
        </div>
        <div>
          <label for="hot">hot</label>
          <input 
            type="checkbox"
            id="hot"
            v-model="params.hot"
          />
        </div>
        <div>
          <label for="time">max prep time {{ params.time }}</label>
          <input 
            type="range"
            id="time"
            min="10"
            max="30"
            step="5"
            v-model="params.time"
          />
        </div>
        <div>
          <button @click="advancedSearch()">
            Advanced search
          </button>
        </div>
      </div>
      <h1>Search results</h1>
      <div v-if="!results.length">
        No results found!
      </div>
      <RecipeSmallPreview
        v-else
        v-for="recipe in results"
        :key="recipe.friendlyId"
        :name="recipe.name"
        :blurb="recipe.blurb"
        :friendly-id="recipe.friendly_id"
      />
    </div>
  </div>
</template>

<script>
import RecipeSmallPreview from "@/components/RecipeSmallPreview.vue"

export default {
  name: 'SearchResultsPage',
  components: { 
    RecipeSmallPreview
  },
  watch: {
    '$route.params.id': '$fetch'
  },
  data() {
    return {
      debugIsPiesUrl: 'default',
      results: [],
      advanced: false,
      params: {
        query: '',
        vegan: false,
        vegetarian: false,
        maindish: false,
        hot: false,
        time: 0
      }
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/search.php?q=${this.$route.params.query}`;
    if (this.advanced) {
      let vegan = this.params.vegan ? '&vegan=1' : ''
      let vegetarian = this.params.vegetarian ? '&vegetarian=1' : ''
      let maindish = this.params.maindish ? '&maindish=1' : ''
      let hot = this.params.hot ? '&hot=1' : ''
      let time = this.params.time ? '&preptime=' + this.params.time : ''
      apiURL = `${this.$config.apiBaseURL}/search.php?q=${this.$route.params.query}${vegan}${vegetarian}${maindish}${hot}${time}`
    }
    this.debugIsPies = apiURL
    let apiResponse = await this.$http.$get(apiURL);
    this.results = apiResponse
  },
  methods: {
    advancedSearch() {
      this.advanced = true
      this.$fetch()
    }
  }
}
</script>

<style scoped>

</style>