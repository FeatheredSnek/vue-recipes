<template>
  <div class="writer">
    <h3>
      <span v-if="friendlyId">
        <nuxt-link :to="{name: 'writers-id', params: {id: friendlyId}}">
          {{ name }}
        </nuxt-link>
      </span>
      <span v-else>
        {{ name }}
      </span>
    </h3>
    <p>{{ shortBio }}</p>
  </div>
</template>

<script>
  export default {
    name: "WriterSmallPreview",
    props: {
      name: {
        type: String,
        required: false,
        default: 'Anonymous author'
      },
      shortBio: {
        type: String,
        required: false,
        default: 'No information about the recipe author'
      },
      friendlyId: {
        type: String,
        required: false,
        default: null
      },
    }
  }
</script>

<style scoped>
.writer {
  background-color: cornsilk;
}
</style>