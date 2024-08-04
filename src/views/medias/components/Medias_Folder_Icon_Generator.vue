<script>
export default {
  name: "Medias_Folder_Icon_Generator",
  props:['item'],

}
</script>

<template>
  <q-icon v-if="!item.children_count" name="fas fa-folder" color="blue-8" class="size" :title="item.description"/>
  <q-icon v-else name="fas fa-folder-open" color="blue-8" class="size" :title="item.description"/>

</template>

<style scoped>
.size{
  font-size: 70px;
}
</style>