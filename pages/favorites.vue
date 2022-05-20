<template>
  <div>
    <div v-if="$fetchState.pending"
      class="loading"
    >
      Loading data
    </div>
    <div v-else-if="$fetchState.error"
      class="error"
    >
      Data loading error
    </div>
    <!-- search bar if no favs are found -->
    <div v-else-if="!favRecipes.length" class="w-full flex flex-col items-center text-center px-2 py-6 sm:py-4">
      <h2 class="font-bold text-4xl text-gray-600 pb-4">You don't have any favorites </h2>
      <h3 class="font-bold text-xl text-lime-500 pb-6">Search for something you like and build your salad collection!</h3>
      <div class="w-full max-w-sm">
        <SearchBarTop />
      </div>
    </div>
    <div v-else>
      <h2 class="font-bold text-3xl text-gray-600 pb-4">
        Your favorites
      </h2>
      <div class="grid md:grid-cols-3 gap-4 xl:gap-8">
        <div 
          v-for="recipe in favRecipes" 
          :key="recipe.friendly_id"
          class="flex flex-col justify-center w-full max-w-md gap-3 mb-10"
        >
          <RecipeSmallPreview
            :name="recipe.name"
            :image="recipe.image"
            :writer="recipe.writer"
            :flags="recipe.flags"
            :friendly-id="recipe.friendly_id"
          />
          <AppActionButton @click="removeFav(recipe.friendly_id)">
            <template #icon>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
            </template>
            <template #text>
              Remove favorite
            </template>
          </AppActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeSmallPreview from "@/components/RecipeSmallPreview.vue"
import AppActionButton from "@/components/AppActionButton.vue"
import SearchBarTop from "@/components/SearchBarTop.vue"

export default {
  name: "FavoritesPage",
  components: {
    RecipeSmallPreview,
    AppActionButton,
    SearchBarTop
  },
  beforeMount() {
    this.storedFavs = this.getStoredFavs()
  },
  data() {
    return {
      storedFavs: [],
      favRecipes: [],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const favString = this.storedFavs.toString()
    let apiURL = `${this.$config.apiBaseURL}/favorites.php?ids=${favString}`
    let apiResponse = await this.$http.$get(apiURL);
    this.favRecipes = apiResponse
  },
  methods: {
    localStorageAvailable() {
      try {
        var x = '__storage_test__';
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
      }
      catch (e) {
        return e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        (localStorage && localStorage.length !== 0);
      }
    },
    removeFav(recipeId) {
      if (this.localStorageAvailable()) {
        // remove id from locally stored favs
        this.storedFavs.splice(this.storedFavs.indexOf(recipeId), 1)
        localStorage.setItem('favorites', this.storedFavs.toString())
        // and then remove the preview - thus no refetching
        const removedIndex = this.favRecipes.findIndex(
          el => el.friendly_id === recipeId
        )
        console.log('remove' + recipeId + ' at ' + removedIndex);
        this.favRecipes.splice(removedIndex, 1)
      }
    },
    getStoredFavs(type = 'array') {
      if (process.client && this.localStorageAvailable()) { // eslint-disable-line
        const stored = localStorage.getItem('favorites')
        if (type == 'string') return stored
        if (type == 'array') {
          return stored.split(',')
        }
      }
    }
  }
}
</script>