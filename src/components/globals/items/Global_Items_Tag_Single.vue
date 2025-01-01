<script>
export default {
  name: "Global_Items_Tag_Single",
  props:['item'],
}
</script>

<template>

  <q-chip v-if="item" size="sm" class="font-11" :label="'# '+item.name" text-color="white" :style="'background-color:'+item.color_code+'!important'"></q-chip>



</template>

<style scoped>

</style>