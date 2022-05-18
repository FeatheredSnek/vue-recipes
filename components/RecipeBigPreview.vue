<template>
  <nuxt-link 
    :to="{name: 'recipes-id', params: {id: friendlyId}}"
    class="block md:max-h-96 max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-7xl border border-gray-200 shadow-xl shadow-gray-100"
  >
    <div class="md:flex">
      <div class="lg:w-3/5 md:w-1/2">
        <div class="relative w-full">
          <AppFlags :flags="flags"/>
        </div>
        <img 
          class="md:max-h-96 h-full w-full object-cover" 
          :src="$imagepath('recipe', image)"
          alt="Man looking at item at a store"
        >
      </div>
      <div class="p-6 md:p-8 lg:w-2/5 md:w-1/2">
        <p class="text-2xl md:text-4xl leading-tight font-bold text-gray-600">
          {{ name }}
        </p>
        <p class="text-lg md:text-xl text-lime-500 md:mt-2 mb-3 md:mb-5">
          <span v-if="writer">
            by <strong>{{ writer }}</strong>
          </span>
          <span v-else>
            Anonymous yet delicious!
          </span>
        </p>
        <p class="mt-2 mb-1 md:text-lg text-slate-500 leading-snug lg:leading-relaxed">
          {{ blurb }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import AppFlags from "@/components/AppFlags.vue"
  export default {
    name: "RecipeBigPreview",
    components: {
      AppFlags
    },
    props: {
      name: {
        type: String,
        required: true
      },
      blurb: {
        type: String,
        required: true
      },
      friendlyId: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      writer: {
        type: String,
        required: false
      },
      flags: {
        type: Object,
        required: true
      }
    }
    // data() {
    //   return {
    //     name: '',
    //     image: '',
    //     blurb: '',
    //     flags: {},
    //     friendlyId: '',
    //     writer: '',
    //   }
    // },
    // async fetch() {
    //   let apiURL = `${this.$config.apiBaseURL}/featured.php`
    //   if (this.$props.customUrl.length) {
    //     apiURL = this.$props.customUrl
    //   }
    //   let apiResponse = await this.$http.$get(apiURL);
    //   this.name = apiResponse.name
    //   this.blurb = apiResponse.blurb
    //   this.image = apiResponse.image
    //   this.flags = apiResponse.flags
    //   this.friendlyId = apiResponse.friendly_id
    //   this.writer = apiResponse.writer
    // },
    // props: {
    //   customUrl: {
    //     type: String,
    //     required: false,
    //     default: ''
    //   }
    // }
  }
</script>

<style scoped>
.recipe {
  background-color: aqua;
  border: 1px solid brown;
}
</style>