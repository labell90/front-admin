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

        "Module_Dashboard_Users_Latest"

    ]),

    Get_Items(){
      this.Module_Dashboard_Users_Latest().then(res => {

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
    <q-card-section class="bg-deep-orange q-pa-sm glossy">
      <q-btn icon="fas fa-times" color="dark" glossy round size="xs" class="float-right"></q-btn>
      <strong class="text-white">آخرین کاربران اضافه شده</strong>
    </q-card-section>
    <q-card-section>
      <global_loading_shape size="45" v-if="loading"></global_loading_shape>
      <div v-else v-for="item in items" :key="item.id" class="q-mb-md">
        <q-avatar size="35px">
          <img src="assets/images/icons/user_new.png">
        </q-avatar>
        <strong class="q-ml-sm font-12 text-deep-orange-7">{{ item.name }}</strong>
        <q-btn :to="{ name : 'users_profile',params : {id : item.id}}" size="xs" color="primary" icon="fas fa-user" glossy round class="float-right q-mt-sm" title="پروفایل کاربر"></q-btn>
        <global_filter_date class="float-right q-mt-sm" :date="item.created_at"></global_filter_date>
        <q-separator class="q-mt-sm"/>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>