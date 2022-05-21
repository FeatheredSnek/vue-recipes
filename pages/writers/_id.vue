<template>
  <div>
    <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
    <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
    <div v-else>
      <div class="w-full grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1  gap-8 lg:gap-16">
        <!-- info -->
        <div class="col-start-1 row-start-1 flex items-center">
          <div>
            <!-- writer name -->
            <div class="flex justify-between items-center w-full">
              <!-- name -->
              <h1 class="text-4xl md:text-5xl leading-tight font-bold text-gray-600 ">
                {{ name }}
                <svg v-if="badge" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-10 md:w-10 relative bottom-[2px] text-lime-500 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </h1>
              <!-- socials lg+ -->
              <div class="relative hidden lg:block min-h-8 h-8 overflow-visible shrink-0">
                <a 
                  v-for="(value,key) in socials"
                  :key="key"
                  :href="value"
                  target="_blank"
                  class="inline-block h-6 w-6 ml-3"
                  :class="{'hidden': !value}"
                >
                  <img 
                    :src="require(`@/assets/icons/${key}.svg`)"
                    class="h-full w-full" 
                  />
                </a>
              </div>
            </div>
            <!-- writer type (depends on the badge status) -->
            <p class="text-lg md:text-2xl text-lime-500 md:mt-2 mb-2 md:mb-6">
              {{ writerType }}
            </p>
            <!-- full bio text -->
            <p class="text-lg md:text-xl lg:text-2xl leading-normal text-gray-600 mb-6">
              {{ bio }}
            </p>
            <!-- socials small (default sm md) -->
            <div class="lg:hidden flex w-100 justify-center gap-6">
              <a 
                v-for="(value,key) in socials"
                :key="key"
                :href="value"
                target="_blank"
                class="inline-block h-6 w-6"
                :class="{'hidden': !value}"
              >
                <img 
                  :src="require(`@/assets/icons/${key}.svg`)"
                  class="h-full w-full" 
                />
              </a>
            </div>
          </div>
        </div>
        <!-- big image -->
        <div class="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 max-h-96 ">
          <img 
            class="rounded-xl w-full h-full object-cover" 
            :src="$imagepath('writer', image)"
          />
        </div>
      </div>

      <AppSeparator/>

      <PreviewContainer
        header="Writer's recipes"
        :custom-url="customUrl"
      />
    </div>
  </div>
</template>

<script>
import PreviewContainer from "@/components/PreviewContainer.vue"
import AppSeparator from "@/components/AppSeparator.vue"
import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"

export default {
  name: "WriterPage",
  components: {
    PreviewContainer,
    AppSeparator,
    AppFetchStateIndicator,
  },
  middleware: 'validateid',
  watch: {
    '$route.params.id': '$fetch'
  },
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      badge: false,
      bio: '',
      image: '',
      socials: {}
    }
  },
  async fetch() {
    let apiURL = `${this.$config.apiBaseURL}/writer.php?friendly_id=${this.$route.params.id}`;
    let apiResponse = await this.$http.$get(apiURL);
    this.name = apiResponse.name
    this.bio = apiResponse.long_bio
    this.image = apiResponse.image
    this.socials = apiResponse.socials
    this.badge = apiResponse.flag_badge
  },
  computed: {
    customUrl() {
      const base = this.$config.apiBaseURL
      return `${base}/search.php?writer=${this.id}`
    },
    writerType() {
      return this.badge ? "Accomplished writer" : "Recipe writer"
    }
  }
}
</script>

<style scoped>

</style>