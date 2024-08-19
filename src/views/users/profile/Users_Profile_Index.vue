<script>
import {mapActions} from "vuex";

export default {
  name: "Users_Profile_Index",
  mounted() {
    this.Get_Lead();

  },
  data(){
    return{
      loading:true,
      lead:null
    }
  },
  methods:{
    ...mapActions([
      "Module_User_Action_Show"
    ]),
    Get_Lead(){
      this.Module_User_Action_Show(this.$route.params.id).then(response => {
        this.lead = response.data.result;
        console.log(this.lead)
        this.loading = false;
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