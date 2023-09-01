<template>
  <div class="flex w-full gap-8 lg:gap-16 flex-col sm:flex-row">
    
    <!-- responsive advanced search form -->
    <div class="sm:w-1/3 lg:w-1/3 w-full">
      <form 
      @submit.prevent="advancedSearch()"
      class="p-6 block w-full h-fit bg-white rounded-xl overflow-hidden border border-gray-200"
      >
        <p class="text-2xl mb-3 font-bold text-gray-600">
          Advanced search
        </p>
        <!-- main search input -->
        <div class="mb-3">
          <label for="query" class="text-lg lg:text-xl">Search for</label>
          <input 
            type="text" 
            id="query" 
            v-model="params.query"
            class="w-full h-12 py-1 pl-4 pr-8 border-gray-300 focus:ring-lime-500 focus:border-lime-500 rounded-lg"
            placeholder="e.g. caesar"
            ref="queryinput"
          />
        </div>
        <ul class="mb-3">
          <li class="text-lg lg:text-xl mb-1 lg:mb-2 flex items-center">
            <input 
              type="checkbox" 
              id="vegan"
              v-model="params.vegan"
              class="w-4 h-4 mr-1 lg:w-5 lg:h-5 lg:mr-2 "
            />
            <label for="vegan">Vegan</label>
          </li>
          <li class="text-lg lg:text-xl mb-1 lg:mb-2 flex items-center">
            <input 
              type="checkbox" 
              id="vegetarian"
              v-model="params.vegetarian"
              class="w-4 h-4 mr-1 lg:w-5 lg:h-5 lg:mr-2 "
            />
            <label for="vegetarian">Vegetarian</label>
          </li>
          <li class="text-lg lg:text-xl mb-1 lg:mb-2 flex items-center">
            <input 
              type="checkbox" 
              id="maindish"
              v-model="params.maindish"
              class="w-4 h-4 mr-1 lg:w-5 lg:h-5 lg:mr-2 "
            />
            <label for="maindish">Main dish candidate</label>
          </li>
          <li class="text-lg lg:text-xl mb-1 lg:mb-2 flex items-center">
            <input 
              type="checkbox" 
              id="hot"
              v-model="params.hot"
              class="w-4 h-4 mr-1 lg:w-5 lg:h-5 lg:mr-2 "
            />
            <label for="hot">Served hot</label>
          </li>
        </ul>
        <!-- prep time slider -->
        <div class="mb-3">
          <label for="time" class="text-lg lg:text-xl">
            Prep time 
            <span :class="timeSliderLabel.css">
              {{ timeSliderLabel.text }}
            </span>
          </label>
          <!-- no v-model here because i need to manually do the first data update -->
          <input 
            type="range"
            id="time"
            min="10"
            max="30"
            step="5"
            @input="getTimeSliderValue($event.target.value)"
            :value="updateTimeSliderValue()"
          />
        </div>
        <AppActionButton>
          <template #icon>
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </template>
          <template #text>
            Search
          </template>
        </AppActionButton>
      </form>
    </div>
    <!-- search results -->
    <div class="sm:w-2/3 lg:w-2/3 w-full">
      <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
      <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
      <div v-else-if="!results.length" class="w-full text-3xl font-bold text-center">
        No results found!
      </div>
      <div v-else>
        <h2 class="font-bold text-3xl text-gray-600 pb-4">
          Search results
        </h2>
        <RecipeBigPreview
          v-for="recipe in results"
          :key="recipe.friendlyId"
          :name="recipe.name"
          :blurb="recipe.blurb"
          :friendly-id="recipe.friendly_id"
          :image="recipe.image"
          :flags="recipe.flags"
          :writer="recipe.writer"
          class="mb-8"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeBigPreview from "@/components/RecipeBigPreview.vue"
import AppActionButton from "@/components/AppActionButton.vue"
import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"

export default {
  name: 'SearchResultsPage',
  components: { 
    RecipeBigPreview,
    AppActionButton,
    AppFetchStateIndicator,
  },
  watch: {
    '$route.params': '$fetch',
    '$route.query': '$fetch'
  },
  data() {
    return {
      results: [],
      params: {
        query: '',
        vegan: false,
        vegetarian: false,
        maindish: false,
        hot: false,
        time: null
      }
    }
  },
  async fetch() {
    let apiURL = `https://dorianm.com/nuxt-recipes-api/search.php?q=${this.$route.params.query}`
    if (this.$route.query.vegan == true) apiURL += '&vegan=1'
    if (this.$route.query.vegetarian == true) apiURL += '&vegetarian=1'
    if (this.$route.query.maindish == true) apiURL += '&maindish=1'
    if (this.$route.query.hot == true) apiURL += '&hot=1'
    if (this.$route.query.time) apiURL += `&preptime=${this.$route.query.time}`
    let apiResponse = await this.$http.$get(apiURL);
    this.results = apiResponse
  },
  methods: {
    advancedSearch() {
      // validate search term
      const regex = /[A-Za-z0-9]/
      const minlength = 2
      if (!(this.params.query.match(regex) && this.params.query.length >= minlength)) {
        this.$refs.queryinput.focus()
        return false
      }
      // prepare route with query and push
      const query = {}
      if (this.params.vegan) query.vegan = true
      if (this.params.vegetarian) query.vegetarian = true
      if (this.params.maindish) query.maindish = true
      if (this.params.hot) query.hot = true
      if (this.params.time) query.time = this.params.time
      this.$router.push(
        { 
          name: 'search-query', 
          params: { query: this.params.query },
          query
        }
      )
    },
    getTimeSliderValue(val) {
      this.params.time = val
    },
    updateTimeSliderValue() {
      if (this.params.time === null) {
        return 20
      }
      else {
        return this.params.time
      }
    }
  },
  computed: {
    timeSliderLabel() {
      const obj = {
        text: 'not specified',
        css: ''
      }
      if (this.params.time !== null) {
        obj.text = `up to ${this.params.time} minutes`
        obj.css = 'font-bold'
      }
      return obj
    }
  },
  head() {
    return {
      title: `Search for ${this.$route.params.query}`,
      meta: [
        { 
          hid: 'description', 
          name: 'description', 
          content: 'A perfect place to find delicious and healthy salad recipes, curated and taste-tested by passionate professionals.' 
        },
        { property: 'og:url', content: this.$config.baseUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'nuxtSalad - delicious and healthy salad recipes' },
        { property: 'og:description', content: 'A perfect place to find delicious and healthy salad recipes, curated and taste-tested by passionate professionals.' },
      ]
    }
  }
}
</script>

<style scoped>

</style>