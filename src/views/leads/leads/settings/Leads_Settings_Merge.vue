<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Settings_Merge",
  data(){
    return {
      phone : null,
      search_loading : false,
    }
  },
  methods:{
    ...mapActions([
        "Module_Lead_Action_All",
    ]),
    Search_Leads(){
      this.search_loading =true;
      this.Module_Lead_Action_All({phone : this.phone}).then(res => {



      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.search_loading=false;

      });


    }


  }
}
</script>

<template>
  <strong class="text-teal-9"> ادغام کردن سرنخ های یکسان</strong>

  <div class="q-mt-lg">
    <span class="font-14">برای جستجو سرنخ مورد نظر شماره موبایل سرنخ را وارد کرده و کلید جستجو را بزنید </span>
    <q-input class="q-mt-sm" dir="ltr"  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="phone"  type="text" placeholder="09XX XXX XXXX" >
      <template v-slot:error>
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
      </template>
    </q-input>
    <q-btn glossy icon="fas fa-search" color="blue-7" label="جستجو سرنخ"></q-btn>
    <div class="q-mt-md">
      <Global_Loading_Shape></Global_Loading_Shape>
    </div>
  </div>


</template>

<style scoped>

</style>