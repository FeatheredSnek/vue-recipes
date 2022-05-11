<template>
  <div>
    <div class="welcome">
      Hero welcome
    </div>
    <h1>Featured recipe</h1>
    <RecipeBigPreview/>
    <hr/>
    <PreviewContainer
      :count="2"
      header="check out these"
    />
  </div>
</template>

<script>
import RecipeBigPreview from "@/components/RecipeBigPreview.vue"
import PreviewContainer from "@/components/PreviewContainer.vue"

export default {
  name: 'IndexPage',
  components: {
    RecipeBigPreview,
    PreviewContainer
  },
  data() {
    return {
    }
  }
}
</script>
