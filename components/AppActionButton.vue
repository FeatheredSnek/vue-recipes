<template>
  <button 
    @click="$emit('click')"
    :disabled="buttonDisabled"
    class="font-bold w-full h-12 rounded-lg flex items-center justify-center border border-gray-300 "
    :class="clickable"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <slot name="icon"></slot>
    </svg>
    <slot name="text"></slot>
  </button>
</template>

<script>
export default {
  name: "AppActionButton",
  emits: ['click'],
  props: {
    buttonDisabled: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    clickable() {
      if (!this.buttonDisabled) {
        return 'hover:bg-gray-600 text-gray-600 hover:text-gray-100 hover:border-0'
      }
      else {
        return 'text-gray-300'
      }
    }
  }
}
</script>