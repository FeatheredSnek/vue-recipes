<template>
  <div class="recipe">
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
      flags: {
        default (rawProps) {
          // default function receives the raw props object as argument
          return {
            vegan: false,
            vegetarian: false,
            hot: false,
            maindish: false
          }
        },
        validator (value) {
          return (
            Object.hasOwn(value, 'vegan') 
            && Object.hasOwn(value, 'vegetarian') 
            && Object.hasOwn(value, 'hot') 
            && Object.hasOwn(value, 'maindish')
          )
        },
        required: true
      },
    }
  }
</script>

<style scoped>
.recipe {
  background-color: darkorange;
  border: 1px solid brown;
}
</style>