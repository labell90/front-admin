<script>
import {mapActions} from "vuex";
import users_Index from "@/views/users/Users_Index.vue";

export default {
  name: "Dashboard_Info_Main",
  computed: {
    users_Index() {
      return users_Index
    }
  },
  mounted() {

    this.Get_Items();

  },
  data(){
    return {
      loading:true,
      items:[]

    }
  },
  methods : {

    ...mapActions([

      "Module_Dashboard_Info_Main"

    ]),

    Get_Items(){
      this.Module_Dashboard_Info_Main().then(res => {

        this.items = res.data.result;

        this.loading=false;

      }).catch(error => {

      })
    }



  }
}
</script>

<template>
<q-card flat bordered >
  <q-card-section class="bg-blue-grey-6 q-pa-sm">
    <q-btn icon="fas fa-times" color="dark" glossy round size="xs" class="float-right"></q-btn>
    <strong class="text-white">خلاصه اطلاعات سیستم</strong>
  </q-card-section>
  <q-card-section class="q-pa-sm">
    <global_loading_shape v-if="loading"></global_loading_shape>
    <div v-else class="row justify-center">
      <div class="col-xl-3 q-px-xs q-pa-xs">
        <q-card class="bg-indigo-8 glossy">
          <router-link :to="{name : 'users_Index'}">
            <q-card-section>
              <q-icon name="fas fa-users" color="white" size="xl"></q-icon>
              <strong class="q-ml-md font-15 text-grey-4">مدیران فعال</strong>
              <strong class="float-right q-mt-sm text-yellow-6 font-24">{{items.active_users}}</strong>
            </q-card-section>
          </router-link>
        </q-card>
      </div>
      <div class="col-xl-3 q-px-xs q-pa-xs">
        <q-card class="bg-pink-8 glossy">
          <router-link :to="{name : 'lead_index'}">
            <q-card-section>
              <q-icon name="fas fa-clipboard-user" color="white" size="xl"></q-icon>
              <strong class="q-ml-md font-15 text-grey-4">سرنخ های فعال</strong>
              <strong class="float-right q-mt-sm text-yellow-6 font-24">{{items.active_leads}}</strong>
            </q-card-section>

          </router-link>
        </q-card>
      </div>
      <div class="col-xl-3 q-px-xs q-pa-xs">
        <q-card class="bg-teal-8 glossy">
          <router-link :to="{name : 'campaigns_index'}">
            <q-card-section>
              <q-icon name="fas fa-house-circle-check" color="white" size="xl"></q-icon>
              <strong class="q-ml-md font-15 text-grey-4">کمپین های جاری</strong>
              <strong class="float-right q-mt-sm text-yellow-6 font-24">{{items.running_campaigns}}</strong>
            </q-card-section>
          </router-link>

        </q-card>
      </div>
      <div class="col-xl-3 q-px-xs q-pa-xs">
        <q-card class="bg-dark glossy">
          <router-link :to="{name : 'campaigns_index'}">
            <q-card-section>
              <q-icon name="fas fa-rectangle-list" color="white" size="xl"></q-icon>
              <strong class="q-ml-md font-15 text-grey-4">همه کمپین ها</strong>
              <strong class="float-right q-mt-sm text-yellow-6 font-24">{{items.all_campaigns}}</strong>
            </q-card-section>
          </router-link>
        </q-card>
      </div>
    </div>

  </q-card-section>

</q-card>
</template>

<style scoped>
.image-size{
  width: 65px;
}
.box-bg{
  background-color: rgba(0,0,0,0.5) !important;
}

</style>