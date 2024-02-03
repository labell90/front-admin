<script>
export default {

  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,

    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;

    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    }
  }

}
</script>

<template>

  <q-layout view="hHh LpR fff">

    <q-header  class="header_bg text-white">
      <q-toolbar>
        <q-btn dense flat round icon="fas fa-list" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <img class="q-mt-xs" src="assets/images/logo.png" width="150" alt="">
        </q-toolbar-title>

<!--        <q-btn dense flat round icon="fas fa-list" @click="toggleRightDrawer" />-->

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" style="background-color: #0d1425">

    </q-drawer>

<!--    <q-drawer  v-model="rightDrawerOpen" side="right" bordered>-->

<!--    </q-drawer>-->

    <q-page-container >

      <q-page class="q-pa-sm q-px-sm">
        <RouterView />
      </q-page>


    </q-page-container>

  </q-layout>

</template>
<style scoped>

.header_bg{
  background-color: #0c041c;
}
.right_side_bg{
  background-color: #0c1219;
}
</style>


