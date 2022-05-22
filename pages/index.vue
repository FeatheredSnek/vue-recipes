<template>
  <div>
    <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
    <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
    <div v-else class="flex w-full justify-between">
      <div class="lg:w-2/3 w-full">
        <h2 class="font-bold text-3xl text-gray-600 pb-4">
          Today's featured
        </h2>
        <RecipeBigPreview
          :name="featured.name"
          :image="featured.image"
          :blurb="featured.blurb"
          :writer="featured.writer"
          :flags="featured.flags"
          :friendly-id="featured.friendlyId"
        />
      </div>
      <div class="hidden lg:w-1/3 lg:flex justify-end items-center">
        <img src="@/assets/icons/welcome.svg" class="w-[90%]"/>

      </div>
    </div>
    
    <AppSeparator/>

    <PreviewContainer
      :count="3"
      header="More green goodness"
    />
    
    <AppSeparator/>

    <PreviewContainer
      :count="3"
      header="Most popular this week"
    />

    <AppSeparator/>

    <div class="w-full flex flex-col items-center text-center px-2 py-6 sm:py-4">
      <h2 class="font-bold text-4xl text-gray-600 pb-4">Still hungry?</h2>
      <h3 class="font-bold text-xl text-lime-500 pb-6">Search our delicious database and find your next awesome salad!</h3>
      <div class="w-full max-w-sm">
        <SearchBar />
      </div>
    </div>

  </div>
</template>

<script>
import RecipeBigPreview from "@/components/RecipeBigPreview.vue"
import PreviewContainer from "@/components/PreviewContainer.vue"
import SearchBar from "@/components/SearchBar.vue"
import AppSeparator from "@/components/AppSeparator.vue"
import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"

export default {
  name: 'IndexPage',
  components: {
    RecipeBigPreview,
    PreviewContainer,
    SearchBar,
    AppSeparator,
    AppFetchStateIndicator,
  },
  data() {
    return {
      featured: {}
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/featured.php`
    let apiResponse = await this.$http.$get(apiURL);
    this.featured.name = apiResponse.name
    this.featured.blurb = apiResponse.blurb
    this.featured.image = apiResponse.image
    this.featured.flags = apiResponse.flags
    this.featured.friendlyId = apiResponse.friendly_id
    this.featured.writer = apiResponse.writer
  },
  head() {
    return {
      title: 'nuxtSalad - delicious and healthy recipes',
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
        { property: 'og:image', content: this.$imagepath('recipe', this.featured.image) },
        { property: 'og:image:alt', content: 'A delicious salad you can make with one of our recipes' },
        { name: 'twitter:description', content: 'A perfect place to find delicious and healthy salad recipes, curated and taste-tested by passionate professionals.' },
        { name: 'twitter:image', content: this.$imagepath('recipe', this.featured.image) },
        { name: 'twitter:title', content: 'nuxtSalad - delicious and healthy salad recipes' },
      ]
    }
  }
}
</script>
