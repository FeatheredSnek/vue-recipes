<template>
  <div>
    <!-- <div class="welcome">
      Hero welcome
    </div> -->
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
    <div v-else class="flex w-full">
      <div class="md:w-2/3 w-full">
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
      <div class="hidden md:block">
        Popular this week
        <span>def </span>
        <span class="sm:hidden">sm </span>
        <span class="md:hidden">md </span>
        <span class="lg:hidden">lg </span>

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
        <SearchBarTop />
      </div>
    </div>

  </div>
</template>

<script>
import RecipeBigPreview from "@/components/RecipeBigPreview.vue"
import PreviewContainer from "@/components/PreviewContainer.vue"
import SearchBarTop from "@/components/SearchBarTop.vue"
import AppSeparator from "@/components/AppSeparator.vue"

export default {
  name: 'IndexPage',
  components: {
    RecipeBigPreview,
    PreviewContainer,
    SearchBarTop,
    AppSeparator
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
}
</script>
