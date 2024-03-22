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
      information_loading : true
    }
  },
  methods:{
    ...mapActions([
        "Modules_Profile_Action_Get_Information"
    ]),
    Get_Information(){
      this.Modules_Profile_Action_Get_Information().then(response => {
        this.information = response.data.result;
          this.information_loading = false;
      }).catch(error => {
          this.information_loading = false;
      })
    }

  }
}
</script>

<template>
  <q-card flat>
    <q-card-section>
     <strong class="font-16 text-pink-8">مشخصات فردی</strong>
      <q-btn :to="{name : 'setting_profile_information_edit'}"  color="blue-9" glossy icon="fas fa-edit q-mr-xs" class="float-right">ویرایش اطلاعات</q-btn>
    </q-card-section>
    <q-separator class="q-mt-sm"/>
    <q-card-section>
      <global_loading_shape v-if="information_loading" :size="60"></global_loading_shape>
      <div class="animation-fade-in" v-else>
        <div class="row">
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">نام و نام خانوادگی : </span>
              <strong>{{ information.name }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">آدرس ایمیل : </span>
              <strong>{{ information.email }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">شماره موبایل : </span>
              <strong>{{ information.phone }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">کد ملی : </span>
              <strong>{{ information.national_code }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">کد پرسنلی : </span>
              <strong>{{ information.employee_code }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">تلفن ثابت : </span>
              <strong>{{ information.tel }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">کشور : </span>
              <strong>{{ information.country }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">استان : </span>
              <strong>{{ information.province }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">شهر : </span>
              <strong>{{ information.city }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">آدرس : </span>
              <strong>{{ information.address }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="q-pa-md">
              <span class="text-grey-8">بیوگرافی : </span>
              <strong>{{ information.bio }}</strong>
            </div>
          </div>

        </div>
      </div>
    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>