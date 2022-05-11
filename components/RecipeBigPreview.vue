<template>
  <!-- TODO fetch state messages -->
  <div class="featured">
    <h2>
      <nuxt-link :to="{name: 'recipes-id', params: {id: friendlyId}}">
        {{ name }}
      </nuxt-link>
    </h2>
    <!-- TODO recipe flags as component -->
    <div>
      <span v-if="flags.vegan">Vegan</span> - 
      <span v-if="flags.vegetarian">Vegetarian</span> - 
      <span v-if="flags.maindish">Suitable for a main dish</span> - 
      <span v-if="flags.hot">Can be served hot</span>
    </div>
    <p>{{ blurb }}</p>
  </div>
</template>

<script>
  export default {
    name: "RecipeBigPreview",
    data() {
      return {
        name: '',
        blurb: '',
        flags: {},
        friendlyId: ''
      }
    },
    async fetch() {
      let apiURL = `${this.$config.apiBaseURL}/featured.php`
      if (this.$props.customUrl.length) {
        apiURL = this.$props.customUrl
      }
      let apiResponse = await this.$http.$get(apiURL);
      this.name = apiResponse.name
      this.blurb = apiResponse.blurb
      this.flags = apiResponse.flags
      this.friendlyId = apiResponse.friendly_id
    },
    props: {
      customUrl: {
        type: String,
        required: false,
        default: ''
      }
    }
    // props: {
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   blurb: {
    //     type: String,
    //     required: true
    //   },
    //   friendlyId: {
    //     type: String,
    //     required: true
    //   },
    //   flags: {
    //     default (rawProps) {
    //       // default function receives the raw props object as argument
    //       return {
    //         vegan: false,
    //         vegetarian: false,
    //         hot: false,
    //         maindish: false
    //       }
    //     },
    //     validator (value) {
    //       return (
    //         Object.hasOwn(value, 'vegan') 
    //         && Object.hasOwn(value, 'vegetarian') 
    //         && Object.hasOwn(value, 'hot') 
    //         && Object.hasOwn(value, 'maindish')
    //       )
    //     },
    //     required: true
    //   },
    // }
  }
</script>

<style scoped>
.recipe {
  background-color: aqua;
  border: 1px solid brown;
}
</style>