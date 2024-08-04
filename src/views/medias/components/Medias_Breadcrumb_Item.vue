<script>
export default {
  name: "Medias_Breadcrumb_Item",
  props:['item'],
  methods:{
    Change_Folder(id){
      this.$emit('Change_Folder_Emit',id)
    }
  }
}
</script>

<template>


    <q-icon name="fas fa-caret-right" color="orange-8"/>
    <q-breadcrumbs-el @click="Change_Folder(item.id)" class="hover-folder cursor-pointer" v-if="item" :label="item.name" icon="fas fa-folder text-gray"/>
  <global_medias_breadcrumb v-if="item && item.parent" :item="item.parent" ></global_medias_breadcrumb>
</template>

<style scoped>
.hover-folder :hover{
    color: #2152ef!important;
}
</style>