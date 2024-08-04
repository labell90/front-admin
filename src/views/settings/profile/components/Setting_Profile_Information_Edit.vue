<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Setting_Profile_Information_Edit",
  created() {
    this.Get_Information();
    this.Get_Locations();

  },
  data(){
    return{
      information : null,
      information_loading : true,
      edit_information_loading : false,
      locations:[],
      countries:[],
      provinces:[],
      cities:[],
      errors :[],
    }
  },
  methods:{
    ...mapActions([
      "Modules_Profile_Action_Get_Information",
      "Modules_Profile_Action_Edit_Information",
      "Module_Location_Action_Index",
      "Module_Location_Action_Country_Selectable",
      "Module_Location_Action_Province_Selectable",
      "Module_Location_Action_City_Selectable"
    ]),

    Get_Information(){
      this.Modules_Profile_Action_Get_Information().then(response => {
        this.information = response.data.result;
        this.information_loading = false;
      }).catch(error => {
        this.information_loading = false;
      })
    },

    Get_Locations(){
      this.Module_Location_Action_Index().then(response => {
        this.locations = response.data.result;
        this.Get_Countries();

      }).catch(error =>{

      })

    },

    Get_Countries(){

      this.Module_Location_Action_Country_Selectable(this.locations).then(response => {
        this.countries = response;
      }).catch(error =>{

      })

    },

    Filter_Countries_Select (val, update, abort) {
      update(() => {
        if (val){
          this.countries =  this.countries.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Countries();
        }
      })
    },

    Filter_Provinces_Select (val, update, abort) {
      update(() => {
        if (val){
          this.provinces =  this.provinces.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          // this.Computed_Get_Cities();
        }
      })
    },

    Filter_Cities_Select (val, update, abort) {
      update(() => {
        if (val){
          this.cities =  this.cities.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          // this.Computed_Get_Cities();
        }
      })
    },

    Edit_Information(){
      this.edit_information_loading=true;
      this.Modules_Profile_Action_Edit_Information(this.information).then(res =>{
        this.Methods_Notify_Update();
        this.errors=[];
        this.edit_information_loading=false;
        return this.$router.push({name : "setting_profile_information"})
      }).catch(error =>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }

        this.edit_information_loading=false;

      })

    }

  },
  computed : {
    Computed_Get_Province(){
      if (this.information.country_id){
        let items= {
          locations : this.locations,
          country_id : this.items.country_id
        }
        this.Module_Location_Action_Province_Selectable(items).then(response => {
          this.provinces = response;
        });
      }
    },
    Computed_Get_Cities(){
      if (this.items.province_id){
        let items= {
          provinces : this.provinces,
          province_id : this.items.province_id
        }
        this.Module_Location_Action_City_Selectable(items).then(response => {
          this.items.city_id = null;
          this.cities = response;
        });i
      }
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
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="information.country_id"
                  label="انتخاب کشور"
                  :options="countries"
                  @filter="Filter_Countries_Select"
                  @change="Computed_Get_Province"
                  emit-value
                  map-options
                  use-input
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-red">
                      گزینه ای یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <global_images_select :image="scope.opt.image" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'country_id')" />
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="information.province_id"
                  label="انتخاب استان"
                  :options="provinces"
                  @filter="Filter_Provinces_Select"
                  @change="Computed_Get_Cities"
                  emit-value
                  map-options
                  use-input
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-red">
                      گزینه ای یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'province_id')" />
                </template>
              </q-select>

            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 ">
            <div class="q-pa-sm">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="information.city_id"
                  label="انتخاب شهر"
                  :options="cities"
                  @filter="Filter_Cities_Select"
                  emit-value
                  map-options
                  use-input
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-red">
                      گزینه ای یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'city_id')" />
                </template>
              </q-select>
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