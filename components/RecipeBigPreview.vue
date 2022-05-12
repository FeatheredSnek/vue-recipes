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
    <img :src="$imagepath('recipe', image)"/>
    <p>{{ blurb }}</p>
  </div>
</template>

<script>
  export default {
    name: "RecipeBigPreview",
    data() {
      return {
        name: '',
        image: '',
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
      this.image = apiResponse.image
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
  }
</script>

<style scoped>
.recipe {
  background-color: aqua;
  border: 1px solid brown;
}
</style>