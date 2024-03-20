<script>

import {mapActions} from "vuex";

export default {
  name: "Setting_Profile_Information_Edit",
  created() {
    this.Get_Information();

  },
  data(){
    return{
      information : null,
      information_loading : true,
      edit_information_loading : false,
      errors :[],
    }
  },
  methods:{
    ...mapActions([
      "Modules_Profile_Action_Get_Information",
      "Modules_Profile_Action_Edit_Information",
    ]),
    Get_Information(){
      this.Modules_Profile_Action_Get_Information().then(response => {
        this.information = response.data.result;
        this.information_loading = false;
      }).catch(error => {
        this.information_loading = false;
      })
    },
    Edit_Information(){
      this.edit_information_loading=true;
      this.Modules_Profile_Action_Edit_Information(this.information).then(res =>{
        this.Methods_Notify_Update();
        this.errors=[];
        this.edit_information_loading=false;
      }).catch(error =>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }

        this.edit_information_loading=false;

      })

    }

  }


}
</script>

<template>
  <q-card flat>
    <q-card-section>
      <strong class="font-16 text-pink-8">ویرایش مشخصات فردی</strong>
      <q-btn :to="{name : 'setting_profile_information'}"  color="yellow-9" text-color="dark" glossy icon="fas fa-backward q-mr-xs text-dark" class="float-right">بازگشت</q-btn>
    </q-card-section>
    <q-separator class="q-mt-sm"/>
    <q-card-section>
      <global_loading_shape v-if="information_loading" :size="60"></global_loading_shape>
      <div class="animation-fade-in" v-else>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="information.name" type="text" label="نام و نام‌خانوادگی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input disable :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="information.email" type="email" label="آدرس ایمیل">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'email')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="information.phone" type="text" label="شماره موبایل">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'national_code')" outlined v-model="information.national_code" type="text" label="کد ملی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'national_code')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'employee_code')" outlined v-model="information.employee_code" type="text" label="کد پرسنلی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'employee_code')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'tel')" outlined v-model="information.tel" type="text" label="تلفن ثابت">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tel')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'country')" outlined v-model="information.country" type="text" label="کشور">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'country')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'country')" outlined v-model="information.country" type="text" label="استان">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'country')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'country')" outlined v-model="information.country" type="text" label="شهر">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'country')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'address')" outlined v-model="information.address" type="text" label="آدرس">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'address')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-input :error="this.Methods_Validation_Check(errors,'bio')" outlined v-model="information.bio" type="text" label="بیوگرافی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'bio')" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-12">
            <div class="q-pa-sm">
              <q-btn @click="Edit_Information" :loading="edit_information_loading" glossy label="ویرایش اطلاعات کاربری" icon-right="fas fa-check" color="positive"></q-btn>
            </div>
          </div>

        </div>


      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>