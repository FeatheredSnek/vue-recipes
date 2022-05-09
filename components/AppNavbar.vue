<template>
  <nav>
    <h1>
      <nuxt-link :to="{ name: 'index' }">
        nuxtRecipes
      </nuxt-link>
      Search
      <a href="#">
        Log in
      </a>
      <a href="#">
        Sign up
      </a>
    </h1>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
nav {
  background:pink;
  width: 100%;
}
</style>