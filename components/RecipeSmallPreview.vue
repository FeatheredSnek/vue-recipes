<template>
  <div class="recipe">
    <h3>
      <nuxt-link :to="{name: 'recipes-id', params: {id: friendlyId}}">
        {{ name }}
      </nuxt-link>
    </h3>
    <p>{{ blurb }}</p>
  </div>
</template>

<script>
  export default {
    name: "RecipeSmallPreview",
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
    }
  }
</script>

<style scoped>
.recipe {
  background-color: gold;
  border: 1px solid brown;
}
</style>