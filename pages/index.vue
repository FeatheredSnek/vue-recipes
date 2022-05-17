<template>
  <div>
    <!-- <div class="welcome">
      Hero welcome
    </div> -->
    <div class="flex w-full">
      <div class="md:w-2/3 w-full">
        <h2 class="font-bold text-3xl text-gray-600 pb-4">
          Today's featured
        </h2>
        <RecipeBigPreview/>
      </div>
      <div class="hidden md:block">
        Popular this week
        <span>def </span>
        <span class="sm:hidden">sm </span>
        <span class="md:hidden">md </span>
        <span class="lg:hidden">lg </span>

      </div>
    </div>
    <!-- <div class="h-20">&nbsp;</div> -->
    
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
    }
  }
}
</script>
