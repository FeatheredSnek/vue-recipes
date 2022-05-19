<template>
  <div 
    class="h-8 w-8 ml-2 rounded-full flex justify-center items-center border border-gray-200 bg-white"
    @click.stop="$emit('flagclick')"
  >
    <slot></slot>
    <div 
      class="absolute -translate-x-12 translate-y-8 h-8 w-24 p-2 rounded-full rounded-tr-none text-sm font-bold text-center border-gray-200 bg-white"
      v-show="hintStatus" 
    >
      {{ hintText }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "AppFlagsIcon",
    props: {
      hintStatus: {
        type: Boolean,
        required: false
      },
      hintText: {
        type: String,
        required: false,
        default: ''
      }
    },
    emits: ['flagclick']
  }
</script>

<style scoped>

</style>