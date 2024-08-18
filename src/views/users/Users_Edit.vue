<script>
import {mapActions} from "vuex";

export default {
  name: "Users_Create",
  mounted() {
    this.Get_Locations();
    this.Get_Item();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items:{
        country_id:null,
        province_id:null,
        city_id:null,
        name:null,
        phone:null,
        email:null,
        national_code:null,
        employee_code:null,
        tel:null,
        address:null,
        bio:null,
        description:null,
      },
      locations:[],
      countries:[],
      provinces:[],
      cities:[],
    }
  },
  methods:{
    ...mapActions([
      "Module_User_Action_Show",
      "Module_User_Action_Edit",


      "Module_Location_Action_Index",
      "Module_Location_Action_Country_Selectable",
      "Module_Location_Action_Province_Selectable",
      "Module_Location_Action_City_Selectable"
    ]),
    Get_Item(){
      this.Module_User_Action_Show(this.$route.params.id).then(response => {
          this.items = response.data.result;
          this.loading=false;
      }).catch(error =>{
        return this.Methods_Notify_Error_NotFound();
      })
    },
    Edit_Item(){
      this.edit_loading=true;
      this.Module_User_Action_Edit(this.items).then(response => {
        this.edit_loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'users_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_loading=false;
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

  },
  computed : {
    Computed_Get_Province(){
      if (this.items.country_id){
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
        });
      }
    }


  }

}
</script>

<template>
  <q-card>
    <q-card-section v-if="loading">
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <template v-else>
      <q-card-section>
        <strong class="text-grey-10">ویرایش اطلاعات مدیر</strong>
        <q-btn :to="{name : 'users_index'}" class="float-right" color="yellow-9" text-color="dark" icon="fas fa-backward" glossy label="بازگشت"></q-btn>
        <q-btn :to="{name : 'users_create'}" class="float-right q-mr-sm" color="teal-8"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>

        <div class="row q-mt-md">
          <img src="assets/images/icons/user-default.png" width="45"  alt="user_profile"/>
          <div class="q-ml-sm q-mt-sm"><strong>{{items.name}}</strong></div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام کامل">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="items.phone"  type="text" label="موبایل">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="items.email"  type="text" label="ایمیل">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'email')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'national_code')" outlined v-model="items.national_code"  type="text" label="کد ملی">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'national_code')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.country_id"
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
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm ">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.province_id"
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
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm q-mt-sm">
<!--            #TODO city selected by user result from server-->
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.city_id"
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
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm q-mt-xs">
            <q-input  :error="this.Methods_Validation_Check(errors,'employee_code')" outlined v-model="items.employee_code"  type="text" label="کد پرسنلی">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'employee_code')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'tel')" outlined v-model="items.tel"  type="text" label="تلفن ثابت">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tel')" />
              </template>
            </q-input>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'address')" outlined v-model="items.address"  type="textarea" rows="4" label="آدرس">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'address')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'bio')" outlined v-model="items.bio"  type="textarea" rows="4" label="بیوگرافی">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'bio')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description"  type="textarea" rows="4" label="توضیحات">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-pa-sm">
            <q-btn color="teal-8" :loading="loading" @click="Edit_Item" glossy icon="fas fa-edit" label="ویرایش آیتم"></q-btn>
          </div>
        </div>
      </q-card-section>
    </template>
  </q-card>
</template>

<style scoped>


</style>