<template>
  <!-- TODO fetch state messages -->
  <div>
    <div>
      <h1>
        <span>{{ name }}</span>
        <span v-if="badge"> ★ </span>
      </h1>
      <h2>About the writer:</h2>
      <img :src="$imagepath('writer', image)"/>
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

    <hr/>

    <PreviewContainer
      header="Writer's recipes"
      :custom-url="customUrl"
    />
  </div>
</template>

<script>
import PreviewContainer from "@/components/PreviewContainer.vue"

export default {
  name: "WriterPage",
  components: {
    PreviewContainer
  },
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
    this.badge = apiResponse.badge
  },
  computed: {
    customUrl() {
      const base = this.$config.apiBaseURL
      return `${base}/search.php?writer=${this.id}`
    }
  }
}
</script>

<style scoped>

</style>