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
  props: {
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    badge: {
      type: Boolean,
      required: false
    },
    socials: {
      type: Object,
      required: true,
      validator (value) {
        return (
          Object.hasOwn(value, 'facebook') 
          && Object.hasOwn(value, 'instagram') 
          && Object.hasOwn(value, 'twitter') 
          && Object.hasOwn(value, 'tiktok')
        )
      },
    },
  }
}
</script>

<style scoped>

</style>