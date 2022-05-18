<template>
  <div class="p-6 block w-full h-fit bg-white rounded-xl overflow-hidden border border-gray-200">
    <p class="text-2xl mb-3 font-bold text-gray-600">
      Ingredients
    </p>
    <ul>
      <li
        v-for="ingredient in ingredients"
        :key="ingredient"
        class="text-lg lg:text-xl text-lime-500 mb-1 lg:mb-2 flex  items-center"
      >
        <input 
          type="checkbox" 
          :id="ingredient"
          @input="selectIngredient(ingredient)"
          class="w-4 h-4 mr-1 lg:w-5 lg:h-5 lg:mr-2 rounded border-lime-500 text-lime-500 focus:ring-offset-1 focus:ring-2"
        />
        <label 
          :for="ingredient" 
          :class="{'line-through': ingredientStatus[ingredient], 'text-gray-500': ingredientStatus[ingredient]}"
        >
          {{ ingredient }} 
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecipeIngredientsList",
  beforeMount () {
    this.$props.ingredients.forEach(e => {
      this.ingredientStatus[e] = false
    });
  },
  data() {
    return {
      ingredientStatus: {},
      debil: [],
      wtf: 0
    }
  },
  props: {
    ingredients: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectIngredient(name) {
      this.ingredientStatus[name] = !this.ingredientStatus[name]
      // no idea why it does not auto update on data change with v-model
      this.$forceUpdate()
    }
  }
}
</script>