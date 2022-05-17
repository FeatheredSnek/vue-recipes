<template>
  <form @submit.prevent="search()" class="block sm:w-auto w-full min-w-[12rem] sm:ml-2">
    <div class="relative">
      <input class="block w-full h-12 py-1 pl-4 pr-8 border-gray-300 focus:ring-lime-500 focus:border-lime-500 rounded-lg font-bold"
        type="search" 
        id="search" 
        placeholder="Find your salad"
        ref="searchinput"
        v-model="query"
      >
      <button class="absolute inset-y-0 w-11 right-0 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
    {{ query }}
  </form>
</template>

<script>
  export default {
    name: "SearchBarTop",
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
        this.$router.push({ name: 'search-query', params: { query: this.query } })
      }
    },
    
  }
</script>

<style scoped>

</style>