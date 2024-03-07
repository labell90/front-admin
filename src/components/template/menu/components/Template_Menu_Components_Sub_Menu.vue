<script>
export default {
  name: "Template_Menu_Components_Sub_Menu",
  props:['item'],
}
</script>

<template>
  <template v-if="item.route_name">
    <q-expansion-item
        class="menu"
        :class="{'menu-active' : this.$route.name === item.route_name}"
        :icon="item.icon+' font-24'"
        :label="item.fa"
        dense-toggle
        expand-separator
        hide-expand-icon
        :to="{name : item.route_name}"
        :header-inset-level="item.level"
    >
    </q-expansion-item>
  </template>
  <template v-else>
    <q-expansion-item
        class="menu"
        :icon="item.icon+' font-24'"
        :label="item.fa"
        dense-toggle
        expand-separator
        :header-inset-level="item.level"
    >
      <template v-if="item.subs">
        <global_menu_item v-for="sub in item.subs" :item="sub"></global_menu_item>

      </template>
    </q-expansion-item>
  </template>

</template>

<style scoped>
.menu{
  color: #666666 !important;
  font-size: 15px;
  font-weight: 550;
}
.menu:hover{
  color: #ffffff !important;
}
.menu-active{
  color: #FFFFFF !important;

}



</style>