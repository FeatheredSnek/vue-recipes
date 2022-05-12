<template>
  <div>
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
    <div 
      v-else
      class="writer"
    >
      <h3>
        <span>
          <nuxt-link :to="{name: 'writers-id', params: {id: id}}">
            {{ name }}
          </nuxt-link>
        </span>
        <span v-if="badge"> ★ </span>
      </h3>
      <img :src="$imagepath('writerth', image)"/>
      <p>{{ shortBio }}</p>
      <p>
        <span v-if="socials.facebook">
          <a :href="socials.facebook">Facebook</a>
        </span> - 
        <span v-if="socials.instagram">
          <a :href="socials.instagram">Instagram</a>
        </span> - 
        <span v-if="socials.twitter">
          <a :href="socials.twitter">Twitter</a>
        </span> - 
        <span v-if="socials.tiktok">
          <a :href="socials.tiktok">Tiktok</a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WriterSmallPreview",
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
      }
    },
    async fetch() {
      let apiURL = `${this.$config.apiBaseURL}/writer.php?friendly_id=${this.$props.id}`;
      let apiResponse = await this.$http.$get(apiURL);
      this.name = apiResponse.name
      this.shortBio = apiResponse.short_bio
      this.socials = apiResponse.socials
      this.image = apiResponse.image
      this.badge = apiResponse.badge
    }
  }
</script>

<style scoped>
.writer {
  background-color: cornsilk;
}
</style>