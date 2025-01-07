<script>
import {mapActions} from "vuex";

export default {
  name: "Client_Profile_Index",
  mounted() {
    this.Get_Client();
  },
  data(){
    return {
      loading:true,
      client:null,
    }
  },
  methods:{
    ...mapActions([
      "Module_Client_Show"
    ]),
    Get_Client(){
      this.Module_Client_Show(this.$route.params.id).then(response => {
        this.client = response.data.result;
        this.loading = false;
        console.log(this.client);
      }).catch(error => {
        this.Methods_Notify_Error_NotFound();
      })
    }
  }
}
</script>

<template>


</template>

<style scoped>

</style>