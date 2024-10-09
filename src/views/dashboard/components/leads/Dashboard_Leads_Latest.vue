<script>
import {mapActions} from "vuex";

export default {
  name: "Dashboard_Users_Latest",
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

        "Module_Dashboard_Leads_Latest"

    ]),

    Get_Items(){
      this.Module_Dashboard_Leads_Latest().then(res => {

        this.items = res.data.result;
        this.loading=false;

      }).catch(error => {

      })
    }



  }
}
</script>

<template>

  <q-card  class="shadow-2" >
    <q-card-section class="bg-red-8 q-pa-sm glossy">
      <q-btn icon="fas fa-times" color="dark" glossy round size="xs" class="float-right"></q-btn>
      <strong class="text-white">آخرین سرنخ های اضافه شده</strong>
    </q-card-section>
    <q-card-section>
      <global_loading_shape size="45" v-if="loading"></global_loading_shape>
      <div v-else v-for="item in items" :key="item.id" class="q-mb-md">
        <strong class="q-ml-sm font-13">{{ item.name }}</strong>
        <q-btn :to="{ name : 'lead_profile',params : {id : item.id}}" size="xs" color="teal-7" icon="fas fa-list" glossy round class="float-right q-mt-sm" title="پروفایل سرنخ"></q-btn>
        <q-separator class="q-mt-md"/>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>