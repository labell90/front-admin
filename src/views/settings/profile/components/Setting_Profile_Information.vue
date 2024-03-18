<script>
import {mapActions} from "vuex";

export default {
  name: "Setting_Profile_Information",
  created() {
    this.Get_Information();
  },
  data(){
    return{
      information : null,
    }
  },
  methods:{
    ...mapActions([
        "Modules_Profile_Action_Get_Information"
    ]),
    Get_Information(){
      this.Modules_Profile_Action_Get_Information().then(response => {
        console.log(response);
      })
    }



  }
}
</script>

<template>
  <q-card flat>
    <q-card-section>
     <strong class="font-16 text-pink-8">مشخصات فردی</strong>
      <q-btn  color="blue-9" glossy icon="fas fa-edit q-mr-xs" class="float-right">ویرایش اطلاعات</q-btn>
    </q-card-section>
    <q-separator class="q-mt-sm"/>
    <q-card-section>
<!--      <global_loading_shape :size="60"></global_loading_shape>-->
      <div>
        <div class="row">
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">نام و نام خانوادگی : </span>
              <strong>مهدی کرد اتراچالی</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">نام و نام خانوادگی : </span>
              <strong>مهدی کرد اتراچالی</strong>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>