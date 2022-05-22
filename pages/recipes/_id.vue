<template>
  <div>
    <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
    <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
    <div v-else>
      <!-- head -->
      <div class="w-full grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-8 lg:gap-16">
        <!-- info -->
        <div class="col-start-1 row-start-1 flex items-center">
          <div>
            <!-- recipe name -->
            <div class="flex justify-between items-center w-full">
              <h1 class="text-4xl md:text-5xl leading-tight font-bold text-gray-600 w-full lg:w-2/3">
                {{ recipeData.name }}
              </h1>
              <div class="relative min-h-8 h-8 w-1/3 hidden lg:block">
                <AppFlags :flags="recipeData.flags" no-pad/>
              </div>
            </div>
            <!-- recipe writer -->
            <p class="text-lg md:text-2xl text-lime-500 md:mt-2 mb-2 md:mb-6">
              <span v-if="recipeData.writer">
                by 
                <nuxt-link :to="{name: 'writers-id', params: {id: recipeData.writerId}}">
                  <strong>{{ recipeData.writer }}</strong>
                </nuxt-link>
              </span>
              <span v-else>
                Anonymous yet delicious!
              </span>
            </p>
            <!-- blurb text -->
            <p class="text-lg md:text-xl lg:text-2xl leading-normal text-gray-600 mb-4 sm:mb-6">
              {{ recipeData.blurb }}
            </p>
            <div class="mb-8 text-lg md:text-xl lg:text-2xl ">
              <!-- preptime -->
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="ml-2">
                  <!-- <span class="hidden md:inline">Takes about</span> -->
                  Takes about
                  <strong>{{ prepTimeLabel }}</strong> 
                  to make
                  <!-- <span class="hidden md:inline">to make</span> -->
                </p>
              </div>
              <!-- servings -->
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p class="ml-2">
                  <!-- <span class="hidden md:inline">Recipe for</span> -->
                  Recipe for
                  <strong>{{ servingsLabel }}</strong>
                </p>
              </div>
            </div>
            <!-- buttons container -->
            <div class="w-full flex">         
              <!-- button fav -->
              <div class="w-1/2 sm:w-36 md:w-44 mr-4">
                <AppActionButton 
                  v-if="!isFavorite"
                  @click="addFavorite()"
                  :button-disabled="!storageEnabled || !addFavsAvailable"
                >
                  <template #icon>
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </template>
                  <template #text>
                    Add favorite
                  </template>
                </AppActionButton>
                <AppActionButton 
                  v-else
                  @click="removeFavorite()"
                  :button-disabled="!storageEnabled"
                >
                  <template #icon>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                  </template>
                  <template #text>
                    Remove favorite
                  </template>
                </AppActionButton>
              </div>
              <!-- button share -->
              <div class="relative w-1/2 sm:w-36 md:w-44">
              <AppActionButton @click="sharePopup = !sharePopup">
                <template #icon>
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </template>
                <template #text>
                  Share recipe
                </template>
              </AppActionButton>
              <AppSharePopup
                v-show="sharePopup"
                @closepopup="sharePopup = false"
                :url="`${$config.baseUrl}/recipes/${$route.params.id}`"
                :title="recipeData.name"
                :description="recipeData.blurb"
                :media="imageUrl"
              />
              </div>
            </div>
          </div>
        </div>
        <!-- big image -->
        <div class="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 max-h-96 ">
          <div class="w-full relative block lg:hidden">
            <AppFlags :flags="recipeData.flags"/>
          </div>
          <img 
            class="rounded-xl w-full h-full object-cover" 
            :src="$imagepath('recipe', recipeData.image)"
          />
        </div>
      </div>
      <AppSeparator/>
      <div class="flex w-full gap-8 lg:gap-16 flex-col sm:flex-row">
        <div class="sm:w-1/3 lg:w-1/4 w-full">
          <RecipeIngredientsList :ingredients="recipeData.ingredients"/>
        </div>
        <div class="sm:w-2/3 lg:w-3/4 w-full">
          <ol class="text-lg lg:text-xl list-decimal list-inside">
            <li class="mb-1 lg:mb-2 leading-normal">{{ recipeData.instructions }}</li>
            <li class="mb-1 lg:mb-2 leading-normal">{{ recipeData.instructions }}</li>
          </ol>
        </div>
      </div>
      <AppSeparator/>
      <WriterSmallPreview
        v-if="recipeData.writerId"
        :id="recipeData.writerId"
      />
    </div>
    
    <AppSeparator/>
    
    <PreviewContainer
      header="Some other recipes to try"
      :custom-url="customUrl"
    />
  </div>
</template>

<script>
import PreviewContainer from "@/components/PreviewContainer.vue"
import WriterSmallPreview from "@/components/WriterSmallPreview.vue"
import AppFlags from "@/components/AppFlags.vue"
import AppSeparator from "@/components/AppSeparator.vue"
import AppActionButton from "@/components/AppActionButton.vue"
import RecipeIngredientsList from "@/components/RecipeIngredientsList.vue"
import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"
import AppSharePopup from "@/components/AppSharePopup.vue"

export default {
  name: "RecipePage",
  components: {
    AppSeparator,
    AppActionButton,
    AppSharePopup,
    AppFetchStateIndicator,
    WriterSmallPreview,
    PreviewContainer,
    AppFlags,
    RecipeIngredientsList,
  },
  middleware: 'validateid',
  watch: {
    '$route.params.id': '$fetch'
  },
  mounted() {
    this.storageEnabled = this.localStorageAvailable()
    this.addFavsAvailable = this.favsAvailable()
    this.isFavorite = this.checkIfFavorite()
  },
  data() {
    return {
      id: this.$route.params.id,
      recipeData: {
        name: '',
        blurb: '',
        flags: {},
        ingredients: [],
        instructions: '',
        image: '',
        prepTime: 0,
        servings: 0,
        writer: '',
        writerId: ''
      },
      storageEnabled: true,
      addFavsAvailable: true,
      isFavorite: false,
      sharePopup: false
    };
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/recipe.php?friendly_id=${this.$route.params.id}`;
    let apiResponse = await this.$http.$get(apiURL);
    this.recipeData.name = apiResponse.name
    this.recipeData.blurb = apiResponse.blurb
    this.recipeData.flags = apiResponse.flags
    this.recipeData.instructions = apiResponse.instructions
    this.recipeData.prepTime = apiResponse.prep_time
    this.recipeData.servings = apiResponse.servings
    this.recipeData.image = apiResponse.image
    this.recipeData.writer = apiResponse.writer
    this.recipeData.writerId = apiResponse.writer_friendly_id
    this.recipeData.ingredients = apiResponse.ingredients.split(';')
  },
  computed: {
    customUrl() {
      const base = this.$config.apiBaseURL
      const count = 3
      return `${base}/more.php?current=${this.id}&count=${count}`
    },
    prepTimeLabel() {
      return `${this.recipeData.prepTime} minutes`
    },
    servingsLabel() {
      return `${this.recipeData.servings} serving${this.recipeData.servings > 1 ? 's' : ''}`
    },
    imageUrl() {
      return this.$imagepath('recipe', this.recipeData.image)
    }
  },
  methods: {
    addFavorite() {
      const currentFavs = localStorage.getItem('favorites')
      localStorage.setItem('favorites', `${currentFavs},${this.$route.params.id}`)
      this.isFavorite = true
    },
    removeFavorite() {
      const currentFavsArr = localStorage.getItem('favorites').split(',')
      const currentFavIndex = currentFavsArr.indexOf(this.$route.params.id)
      currentFavsArr.splice(currentFavIndex, 1)
      localStorage.setItem('favorites', currentFavsArr.toString())
      this.isFavorite = false
    },
    checkIfFavorite() {
      if (process.client) { //eslint-disable-line
        if (localStorage.getItem('favorites') === null) return false
        return localStorage.getItem('favorites')
          .split(',')
          .includes(this.$route.params.id)
      }
    },
    favsAvailable() {
      if (process.client) { //eslint-disable-line
        if (localStorage.length > 18) return false
        return true
      }
    },
    localStorageAvailable() {
      if (process.client) { //eslint-disable-line
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
      }
    },
  },
  head() {
    return {
      title: this.recipeData.name,
      meta: [
        { 
          hid: 'description', 
          name: 'description', 
          content: this.recipeData.blurb, 
        },
        { property: 'og:url', content: `${this.$config.baseUrl}/recipes/${this.$route.params.id}` },
        { property: 'og:title', content: this.recipeData.name },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: this.recipeData.blurb },
        { property: 'og:image', content: this.$imagepath('recipe', this.recipeData.image) },
        { property: 'og:image:alt', content: `${this.recipeData.name} - photo of the prepared salad` },
        { name: 'twitter:description', content: this.recipeData.blurb },
        { name: 'twitter:image', content: this.$imagepath('recipe', this.recipeData.image) },
        { name: 'twitter:title', content: this.recipeData.name },
      ]
    }
  }
}
</script>

<style scoped>
</style>