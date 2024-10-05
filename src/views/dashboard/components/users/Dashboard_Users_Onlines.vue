<script>
import {mapActions} from "vuex";

export default {
  name: "Dashboard_Users_Onlines",
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

        "Module_Dashboard_Users_Online"

    ]),

    Get_Items(){
      this.Module_Dashboard_Users_Online().then(res => {

        this.items = res.data.result;
        this.loading=false;
        console.log(this.items);

      }).catch(error => {

      })
    }



  }
}
</script>

<template>

  <q-card>
    <q-card-section>
      <strong class="text-red">کاربران آنلاین</strong>
      <q-separator class="q-mt-sm q-mb-sm"/>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>