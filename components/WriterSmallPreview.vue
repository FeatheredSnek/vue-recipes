<template>
  <div>
    <AppFetchStateIndicator v-if="$fetchState.pending" indicates="loading"/>
    <AppFetchStateIndicator v-else-if="$fetchState.error" indicates="error"/>
    <div v-else>
      <h2 v-if="!noheader" class="font-bold text-3xl text-gray-600 pb-4">
        About the writer
      </h2>
      <div class="w-full flex sm:flex-row flex-col items-center gap-6 md:gap-10 py-8 px-6 md:px-12 border border-gray-200 rounded-xl">
        <!-- picture -->
        <nuxt-link :to="{name: 'writers-id', params: {id}}" class="shrink-0">
          <img 
            class="h-24 w-24 rounded-full object-cover " 
            :src="$imagepath('writerth', image)"
            :alt="shortBio"
          >
        </nuxt-link>
        <!-- name + blurb -->
        <div class="shrink-1">
          <p class="text-2xl md:text-4xl leading-tight font-bold text-gray-600">
            <nuxt-link class="w-full" :to="{name: 'writers-id', params: {id}}">
              {{ name }}
            </nuxt-link>
            <svg xmlns="http://www.w3.org/2000/svg" v-if="badge" class="h-6 w-6 md:h-8 md:w-8 relative bottom-[2px] text-lime-500 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </p>
          <p class="mt-2 mb-1 md:text-lg text-slate-500 leading-snug lg:leading-relaxed">
            {{ shortBio }}
          </p>
        </div>
        <!-- socials -->
        <div class="sm:h-24 shrink-0 flex overflow-visible items-center justify-between gap-8 sm:gap-6 pt-6 sm:pt-0 sm:pl-6 md:pl-12 border-t sm:border-t-0 sm:border-l border-gray-200">
          <a v-if="socials.facebook" :href="socials.facebook" target="_blank">
            <img class="h-6 w-6" src="@/assets/icons/social/facebook.svg"/>
          </a>
          <a v-if="socials.facebook" :href="socials.instagram" target="_blank">
            <img class="h-6 w-6" src="@/assets/icons/social/instagram.svg"/>
          </a>
          <a v-if="socials.twitter" :href="socials.twitter" target="_blank">
            <img class="h-6 w-6" src="@/assets/icons/social/twitter.svg"/>
          </a>
          <a v-if="socials.tiktok" :href="socials.tiktok" target="_blank">
            <img class="h-6 w-6" src="@/assets/icons/social/tiktok.svg"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppFetchStateIndicator from "@/components/AppFetchStateIndicator.vue"

  export default {
    name: "WriterSmallPreview",
    components: {
      AppFetchStateIndicator
    },
    data() {
      return {
        name: '',
        shortBio: '',
        image: '',
        socials: {},
        badge: false
      }
    },
    props: {
      id: {
        type: String,
        required: true
      },
      noheader: {
        type: Boolean,
        required: false
      }
    },
    async fetch() {
      let apiURL = `/nuxt-recipes-api/writer.php?friendly_id=${this.$props.id}`;
      let apiResponse = await this.$http.$get(apiURL);
      this.name = apiResponse.name
      this.shortBio = apiResponse.short_bio
      this.socials = apiResponse.socials
      this.image = apiResponse.image
      this.badge = apiResponse.flag_badge
    }
  }
</script>
