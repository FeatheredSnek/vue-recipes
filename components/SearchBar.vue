<template>
  <form @submit="search()" class="block px-1">
    <div class="relative">
      <input class="block w-full h-12 py-1 pl-2 pr-8 border-gray-300 text-lg font-bold rounded-md"
        type="search" 
        id="search" 
        name="q"
        placeholder="Find your salad"
        ref="searchinput"
        v-model="query"
      >
      <button class="absolute inset-y-0 w-10 right-0 flex items-center">
        <img src="../assets/icons/search.svg" class="w-6 h-6"/>
      </button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "SearchBar",
    data() {
      return {
        query: ''
      }
    },
    watch: {
      focused: function(val, oldVal) {
        if (val === true && oldVal === false) {
          this.$refs.searchinput.focus()
        }
      }
    },
    props: {
      focused: {
        type: Boolean,
        required: false,
      }
    },
    methods: {
      search() {
        this.$router.push({name: 'search', params: {query: this.query}})
      }
    },
    
  }
</script>

<style scoped>

</style>