<script>
import Dashboard_Users_Onlines from "@/views/dashboard/components/users/Dashboard_Users_Onlines.vue";

export default {
  name: "Dashboard",
  components : {
    'users_online' : Dashboard_Users_Onlines

  }

}
</script>

<template>
  <div class="row">

    <div class="col-lg-6">

      <users_online></users_online>

    </div>

    <div class="col-lg-6">

    </div>


  </div>

</template>

<style scoped>

</style>