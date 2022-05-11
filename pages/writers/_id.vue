<template>
  <div>
    <!-- TODO merge details component with this page as its not used anywhere else??? -->
    <WriterDetails
      :name="writerData.name"
      :bio="writerData.long_bio"
      :socials="socialLinksObject"
      :badge="!!writerData.flag_badge"
    />
    <hr/>
    <PreviewContainer
      header="Writer's recipes"
      :custom-url="null"
    />
  </div>
</template>

<script>
import WriterDetails from "@/components/WriterDetails.vue"
import PreviewContainer from "@/components/PreviewContainer.vue"

export default {
  name: "WriterPage",
  components: {
    WriterDetails,
    PreviewContainer
  },
  watch: {
    '$route.params.id': '$fetch'
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    customUrl() {
      const base = this.$config.apiBaseURL
      return `${base}/search.php?writer=${this.id}`
    }
  }
}
</script>

<style scoped>

</style>