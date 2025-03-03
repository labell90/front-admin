<script>
export default {
  name: "Media_File_Manager",
  props: {
    type: {
      type: String,
      default: 'file' // یا 'image'
    }
  },
  data() {
    return {
      showFileManager: false
    };
  },
  computed: {
    fileManagerUrl() {
      return this.VUE_APP_API+"/filemanager";
    }
  },
  methods: {

  }
}
</script>

<template>
  <q-card flat>
    <q-card-section>
      <iframe
          :src="fileManagerUrl"
          style="width: 100%;border: none!important;height: 70vh!important;"
      ></iframe>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>