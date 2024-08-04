<script>
export default {
  name: "Medias_Breadcrumb",
  props:['item'],
  methods:{
    Change_Folder(id){
      this.$emit("Change_Folder",id)
    }
  }
}
</script>

<template>
  <q-breadcrumbs gutter="xs" style="float: left">
    <global_medias_breadcrumb @Change_Folder_Emit="(id) =>  Change_Folder(id)" v-if="item" :item="item"></global_medias_breadcrumb>
  </q-breadcrumbs>
</template>

<style scoped>

</style>