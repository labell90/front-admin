<script>
import Medias_Folder_Icon_Generator from "@/views/medias/components/Medias_Folder_Icon_Generator.vue";

export default {
  name: "Medias_Folders_Item_Grid",
  components:{
    'folder_icon' : Medias_Folder_Icon_Generator,
  },
  props:['item'],
}
</script>

<template>
  <q-card flat>
    <q-card-section class="text-center">
      <folder_icon class="cursor-pointer" :item="item"/>
      <div class="folder-name cursor-pointer">
        {{item.name}}
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.folder-name{
  padding-top: 3px;
  font-size: 15px;
  font-weight: 450;

}
</style>