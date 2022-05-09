<template>
  <div>
    <h1>{{ name }}</h1>
    <p>{{ blurb }}</p>
    <p v-if="writerName.length">
      {{ writerName }}
    </p>
    <div>
      <span v-if="flags.vegan">Vegan</span> - 
      <span v-if="flags.vegetarian">Vegetarian</span> - 
      <span v-if="flags.maindish">Suitable for a main dish</span> - 
      <span v-if="flags.hot">Can be served hot</span>
    </div>
    <hr/>
    <h2>Ingredients:</h2>
    <ul>
      <li v-for="ingredient in ingredients">
        {{ ingredient }}
      </li>
    </ul>
    <hr/>
    <h2>Preparation:</h2>
    <p>{{ instructions }}</p>
    <p>
      <span>
        Prep time: {{ prepTime }}  
      </span>
      <span>
        Servings: {{ servings }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "RecipeDetails",
  props: {
    name: {
      type: String,
      required: true
    },
    writerName: {
      type: String,
      required: false,
      default: ''
    },
    blurb: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    ingredients: {
      type: Array,
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
    prepTime: {
      type: Number,
      required: true
    },
    servings: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
</style>