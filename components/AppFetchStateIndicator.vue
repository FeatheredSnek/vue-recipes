<template>
  <div class="w-full text-center py-8 text-2xl flex justify-center items-center">
    <svg v-if="indicates == 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <svg v-else class="animate-spin h-6 w-6 text-lime-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p class="ml-3">
      {{ indicates == 'loading' ? 'Loading data...' : 'API fetch error' }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AppFetchStateIndicator",
  props: {
    indicates: {
      type: String,
      required: true,
      validator: (val) => {
        return (val == 'loading' || val == 'error')
      }
    }
  }
}
</script>