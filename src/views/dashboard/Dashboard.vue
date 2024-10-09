<script>
import Dashboard_Users_Onlines from "@/views/dashboard/components/users/Dashboard_Users_Onlines.vue";
import Dashboard_Users_Latest from "@/views/dashboard/components/users/Dashboard_Users_Latest.vue";
import Dashboard_Info_Main from "@/views/dashboard/components/information/Dashboard_Info_Main.vue";
import Dashboard_Leads_Latest from "@/views/dashboard/components/leads/Dashboard_Leads_Latest.vue";

export default {
  name: "Dashboard",
  components : {
    'users_online' : Dashboard_Users_Onlines,
    'users_latest' : Dashboard_Users_Latest,
    'information_main' : Dashboard_Info_Main,
    'leads_latest' : Dashboard_Leads_Latest,

  }

}
</script>

<template>
  <div class="row">

    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-px-sm q-pa-sm">
      <information_main></information_main>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-sm q-pa-sm">
      <users_online></users_online>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-sm q-pa-sm">
      <users_latest></users_latest>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-sm q-pa-sm">
      <leads_latest></leads_latest>
    </div>

  </div>

</template>

<style scoped>

</style>