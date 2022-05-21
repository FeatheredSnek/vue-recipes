<template>
  <div>
    <div class="w-full flex flex-col items-center text-center px-2 py-6 sm:py-4">
      <h2 class="font-bold text-4xl text-gray-600 pb-4">
        Who we are
      </h2>
      <h3 class="font-bold text-xl text-lime-500 pb-6">
        Our mission is to bring you the freshest, healthies, 
        <br/>
        and the most appetizing salad recipes every day!
      </h3>
      <div class="max-w-4xl text-lg md:text-xl leading-normal text-gray-600">
        <p class="mb-4">
          Semper viverra nam libero justo laoreet sit amet. Ultricies leo integer malesuada nunc vel. Risus feugiat in ante metus dictum at. Etiam dignissim diam quis enim lobortis. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Dolor morbi non arcu risus quis. Semper feugiat nibh sed pulvinar proin. Lectus arcu bibendum at varius vel pharetra vel. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Bibendum arcu vitae elementum curabitur vitae nunc.
        </p>
        <p>
          Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Id porta nibh venenatis cras sed. Ac orci phasellus egestas tellus. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Ultricies tristique nulla aliquet enim tortor at auctor. Risus nec feugiat in fermentum posuere. Blandit libero volutpat sed cras ornare arcu dui vivamus arcu.
        </p>
      </div>
    </div>
    <AppSeparator/>
    <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
    <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
    <div v-else class="w-full flex flex-col items-center text-center px-2 py-6 sm:py-4">
      <h2 class="font-bold text-4xl text-gray-600 mb-8">
        Our brilliant writers
      </h2>
      <div class="text-left">
        <WriterSmallPreview
          v-for="writerId in writers"
          :key="writerId"
          :id="writerId"
          noheader
          class="mb-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppSeparator from '@/components/AppSeparator.vue'
import WriterSmallPreview from '@/components/WriterSmallPreview.vue'
import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"

export default {
  name: "AboutPage",
  components: {
    AppFetchStateIndicator,
    AppSeparator,
    WriterSmallPreview
  },
  data() {
    return {
      writers: []
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/allwriters.php`;
    let apiResponse = await this.$http.$get(apiURL);
    this.writers = apiResponse
  }
}
</script>