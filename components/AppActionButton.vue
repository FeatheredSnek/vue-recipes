<template>
  <button class="hover:bg-gray-600 text-gray-600 hover:text-gray-100 font-bold w-full h-12 rounded-lg flex items-center justify-center border border-gray-300 hover:border-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <slot name="icon"></slot>
    </svg>
    <slot name="text"></slot>
  </button>
</template>

<script>
export default {
  name: "AppActionButton"
}
</script>