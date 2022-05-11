<template>
  <div>
    <h1>
      <span>{{ name }}</span>
      <span v-if="badge"> ★ </span>
    </h1>
    <h2>About the writer:</h2>
    <p>{{ bio }}</p>
    <hr/>
    <h2>Writer on social media</h2>
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
  name: "WriterDetails",
  data() {
    return {
      name: '',
      longBio: '',
      badge: false,
      socials: {}
    }
  },
  async fetch() {
    // TODO this kinda repeats small preview with lng bio but wcyd
    let apiURL = `${this.$config.apiBaseURL}/writer.php?friendly_id=${this.$props.id}`;
    let apiResponse = await this.$http.$get(apiURL);
    this.name = apiResponse.name
    this.longBio = apiResponse.long_bio
    this.socials = apiResponse.socials
    this.badge = apiResponse.badge
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>

</style>