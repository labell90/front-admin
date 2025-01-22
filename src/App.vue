<script>
import Template_Header_User from "@/components/template/header/Template_Header_User.vue";
import Template_Header_Notifications from "@/components/template/header/Template_Header_Notifications.vue";
import Template_Header_Shortcuts from "@/components/template/header/Template_Header_Shortcuts.vue";
import Template_Menu_Main from "@/components/template/menu/Template_Menu_Main.vue";
import Template_Title from "@/components/template/Template_Title.vue";
import Template_Header_Tags from "@/components/template/header/Template_Header_Tags.vue";
import {mapGetters} from "vuex";

export default {

  components:{
    'template_header_user' : Template_Header_User,
    'template_header_notification' : Template_Header_Notifications,
    'template_header_shortcuts' : Template_Header_Shortcuts,
    'template_header_tags' : Template_Header_Tags,
    'template_menu_main' : Template_Menu_Main,
    'template_title' : Template_Title,
  },
  data() {
    return {
      leftDrawerOpen: true,
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
  },
  computed:{
    ...mapGetters([
      "Modules_Authenticate_Getter_Check"
    ]),
  }

}
</script>

<template>

  <q-layout view="hHh LpR fff">

    <q-header  class="header_bg text-white">
      <q-toolbar>
        <q-btn v-if="this.$route.name !== 'auth_login'" dense flat round icon="fas fa-list" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <img class="q-mt-xs" src="assets/images/logo.png" width="150" alt="">
        </q-toolbar-title>
<!--        <q-btn dense flat round icon="fas fa-list" @click="toggleRightDrawer" />-->
          <template_header_shortcuts v-if="this.$route.name !== 'auth_login'"  ></template_header_shortcuts>
          <template v-if="Modules_Authenticate_Getter_Check" >
            <template_header_tags  ></template_header_tags>
          </template>
          <template_header_notification  class="q-ml-xs" v-if="this.$route.name !== 'auth_login'"  ></template_header_notification>
          <template_header_user class="q-ml-md" v-if="this.$route.name !== 'auth_login'"></template_header_user>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="this.$route.name !== 'auth_login'" v-model="leftDrawerOpen" side="left" style="background-color: #0d0e12" >
      <template_menu_main></template_menu_main>
    </q-drawer>

<!--    <q-drawer  v-model="rightDrawerOpen" side="right" bordered>-->

<!--    </q-drawer>-->

    <q-page-container >

      <q-page class="q-pa-sm q-px-sm">
        <template_title v-if="this.$route.name !== 'auth_login'"></template_title>
        <router-view></router-view>
      </q-page>


    </q-page-container>

  </q-layout>

</template>
<style scoped>

.header_bg{
  background-color: #0B0C10;
}
.right_side_bg{
  background-color: #0c1219;
}
</style>


