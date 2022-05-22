<template>
  <div class="absolute w-full h-12 bottom-12 bg-white border rounded-lg border-gray-300">
    <div class="relative w-full h-full flex justify-center items-center gap-4">
      <ShareNetwork
        network="facebook"
        :url="url"
        :title="title"
        :description="description"
        :quote="description"
        :media="media"
      >
        <img src="../assets/icons/social/facebook.svg" class="w-5 h-5"/>
      </ShareNetwork>
      <ShareNetwork
        network="twitter"
        :url="url"
        :title="title"
        :description="description"
        :media="media"
        twitterUser="nuxtsalad"
      >
        <img src="../assets/icons/social/twitter.svg" class="w-5 h-5"/>
      </ShareNetwork>
      <ShareNetwork
        network="pinterest"
        :url="url"
        :title="title"
        :description="description"
        :media="media"
      >
        <img src="../assets/icons/social/pinterest.svg" class="w-5 h-5"/>
      </ShareNetwork>
      <button @click.prevent="$emit('closepopup')" class="h-4 w-4 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSharePopup",
  emits: ['closepopup'],
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    media: {
      type: String,
      required: true
    }
  }
}
</script>