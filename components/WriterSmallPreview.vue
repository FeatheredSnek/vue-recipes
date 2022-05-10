<template>
  <!-- TODO fetch status v-if-else  -->
  <div class="writer">
    <h3>
      <span>
        <nuxt-link :to="{name: 'writers-id', params: {id: id}}">
          {{ name }}
        </nuxt-link>
      </span>
      <span v-if="badge"> ★ </span>
    </h3>
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
</template>

<script>
  export default {
    name: "WriterSmallPreview",
    data() {
      return {
        name: '',
        shortBio: '',
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
      // let apiURL = `${this.$config.apiBaseURL}/writer.php?friendly_id=${this.$props.id}`;
      let apiURL = `${this.$config.apiBaseURL}/writer.php?friendly_id=john_cook`;
      let apiResponseA = await this.$http.$get(apiURL);
      let apiResponse = apiResponseA.writer
      this.name = apiResponse.name
      this.shortBio = apiResponse.short_bio
      this.socials = apiResponse.socials
      this.badge = apiResponse.badge
    }
  }
</script>

<style scoped>
.writer {
  background-color: cornsilk;
}
</style>