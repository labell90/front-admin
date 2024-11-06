<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Edit",
  mounted() {
    this.Get_Item();
    this.Get_Location();
    this.Get_Lead_Categories();
    this.Get_Lead_Types();
    this.Get_Lead_Resources();
    this.Get_Lead_Industries();
    this.Get_Lead_Statuses();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      countries:[],
      provinces:[],
      cities:[],
      lead_categories:[],
      lead_resources:[],
      lead_statuses:[],
      lead_industries:[],
      lead_types:[],
      items:{
        country_id : null,
        province_id : null,
        city_id : null,
        lead_category_id : null,
        lead_resource_id : null,
        lead_status_id : null,
        lead_industry_id : null,
        lead_type_id : null,
        name : null,
        phone : null,
        email : null,
        company : null,
        tel : null,
        fax : null,
        postal_code : null,
        website : null,
        instagram : null,
        telegram : null,
        brand : null,
        company_position : null,
        address : null,
        description : null,
        is_special : 0
      }
    }
  },
  methods:{
    ...mapActions([
        "Module_Location_Action_Index",
        "Module_Location_Action_Country_Selectable",
        "Module_Location_Action_Province_Selectable",
        "Module_Location_Action_City_Selectable",
        "Module_Lead_Category_Action_Index",
        "Module_Lead_Industry_Action_Index",
        "Module_Lead_Resource_Action_Index",
        "Module_Lead_Types_Action_Index",
        "Module_Lead_Status_Action_Index",
        "Module_Lead_Action_Show",
        "Module_Lead_Action_Edit"

    ]),
    Get_Item(){
      this.Module_Lead_Action_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Lead_Action_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'lead_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },

    Get_Location(){
      this.Module_Location_Action_Index().then(response => {
        this.location = response.data.result;
        this.Get_Country();
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })

    },

    Get_Country(){
      if (this.location.length){
        this.Module_Location_Action_Country_Selectable(this.location).then(response => {
          this.countries = response;
          this.Get_Provinces()
        }).catch(error => {
          this.Methods_Notify_Error_Internal();
        })
      }
    },
    Get_Provinces(){
      if (this.items.country_id){
        let items = {
          locations : this.location,
          country_id : this.items.country_id
        }
        console.log(items)
        this.Module_Location_Action_Province_Selectable(items).then(response => {
          this.provinces = response;
          this.Get_Cities();
        });
      }
    },
    Get_Cities(){
      if (this.items.province_id){
        let items= {
          provinces : this.provinces,
          province_id : this.items.province_id
        }
        this.Module_Location_Action_City_Selectable(items).then(response => {
          this.cities = response;
        });
      }
    },


    Get_Lead_Categories(){
      this.Module_Lead_Category_Action_Index({per_page:1000}).then(response => {
        this.lead_categories=[];
        if (response.data.result.data){
          response.data.result.data.forEach(category => {
            this.lead_categories.push({label:category.name, value: category.id,color_code : category.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Resources(){
      this.Module_Lead_Resource_Action_Index({per_page:1000}).then(response => {
        this.lead_resources=[];

        if (response.data.result.data){
          response.data.result.data.forEach(resource => {
            this.lead_resources.push({label:resource.name, value: resource.id,color_code : resource.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Statuses(){
      this.Module_Lead_Status_Action_Index({per_page:1000}).then(response => {
        this.lead_statuses=[];
        if (response.data.result.data){
          response.data.result.data.forEach(status => {
            this.lead_statuses.push({label:status.name, value: status.id,color_code : status.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Industries(){
      this.Module_Lead_Industry_Action_Index({per_page:1000}).then(response => {
        this.lead_industries=[];
        if (response.data.result.data){
          response.data.result.data.forEach(industry => {
            this.lead_industries.push({label:industry.name, value: industry.id,color_code : industry.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Types(){
      this.Module_Lead_Types_Action_Index({per_page:1000}).then(response => {
        this.lead_types=[];
        if (response.data.result.data){
          response.data.result.data.forEach(type => {
            this.lead_types.push({label:type.name, value: type.id,color_code : type.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },


    Filter_Countries_Select (val, update, abort) {
      update(() => {
        if (val){
          this.countries =  this.countries.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Country();
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

        }
      })
    },

    Filter_Lead_Categories_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_categories =  this.lead_categories.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Categories();
        }
      })
    },
    Filter_Lead_Resources_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_resources =  this.lead_resources.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Resources();
        }
      })
    },
    Filter_Lead_Industries_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_industries =  this.lead_industries.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Industries();
        }
      })
    },
    Filter_Lead_Statuses_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_statuses =  this.lead_statuses.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Statuses();
        }
      })
    },
    Filter_Lead_Types_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_types =  this.lead_types.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Types();
        }
      })
    },
    computed : {
      Computed_Get_Province(){
        if (this.items.country_id){
          let items = {
            locations : this.location,
            country_id : this.items.country_id
          }
          console.log(items)
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
}
</script>

<template>
  <q-card>
    <q-card-section v-if="loading">
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <template v-else>

      <q-card>
        <q-card-section>
          <strong class="text-grey-10">ویرایش سرنخ : <span class="text-red-8">{{ items.name }}</span></strong>
          <q-btn :to="{name : 'lead_index'}" class="float-right" color="yellow-9" text-color="black" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
          <q-btn :to="{name : 'lead_create'}" class="float-right q-mr-sm" color="pink-7"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>

        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-icon name="fas fa-user" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات شخصی سرنخ</strong>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام و نام خانوادگی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="items.phone"  type="text" label="شماره موبایل">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="items.email"  type="text" label="آدرس ایمیل">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'email')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'company')" outlined v-model="items.company"  type="text" label="نام شرکت">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'company')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'company_position')" outlined v-model="items.company_position"  type="text" label="سمت در شرکت">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'company_position')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'tel')" outlined v-model="items.tel"  type="text" label="تلفن ثابت">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tel')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'fax')" outlined v-model="items.fax"  type="text" label="فکس">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'fax')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'brand')" outlined v-model="items.brand"  type="text" label="نام برند">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'brand')" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-xs">
              <q-input rows="3" :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description"  type="textarea" label="توضیحات">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                </template>
              </q-input>
            </div>


            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-list" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات عمومی سرنج</strong>
            </div>
            <div class="col-12 q-mb-md">
              <q-separator/>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.lead_category_id"
                  label="انتخاب دسته دبندی"
                  :options="lead_categories"
                  @filter="Filter_Lead_Categories_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'lead_category_id')"

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
                      <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_category_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.lead_resource_id"
                  label="انتخاب منبع"
                  :options="lead_resources"
                  @filter="Filter_Lead_Resources_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'lead_resource_id')"

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
                      <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_resource_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.lead_industry_id"
                  label="انتخاب منبع"
                  :options="lead_industries"
                  @filter="Filter_Lead_Industries_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'lead_industry_id')"

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
                      <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_industry_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.lead_status_id"
                  label="انتخاب وضعیت"
                  :options="lead_statuses"
                  @filter="Filter_Lead_Statuses_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'lead_status_id')"

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
                      <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_status_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.lead_type_id"
                  label="انتخاب نوع"
                  :options="lead_types"
                  @filter="Filter_Lead_Types_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'lead_type_id')"

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
                      <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_type_id')" />
                </template>
              </q-select>
            </div>


            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-location" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات مکانی</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
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
                  :error="this.Methods_Validation_Check(errors,'country_id')"

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
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
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
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
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
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'postal_code')" outlined v-model="items.postal_code"  type="text" label="کد پستی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'postal_code')" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-xs">
              <q-input rows="3" :error="this.Methods_Validation_Check(errors,'address')" outlined v-model="items.address"  type="textarea" label="آدرس">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'address')" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-icons" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات شبکه های اجتماعی</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'website')" outlined v-model="items.website"  type="text" label="وبسایت">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'website')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'instagram')" outlined v-model="items.instagram"  type="text" label="آدرس اینستاگرام">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'instagram')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'telegram')" outlined v-model="items.telegram"  type="text" label="آدرس تلگرام">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'telegram')" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-xs">
              <q-btn color="teal-8" :loading="edit_loading" @click="Edit_Item" glossy icon="fas fa-plus-circle" label="ویرایش آیتم"></q-btn>
            </div>

          </div>

        </q-card-section>
      </q-card>


    </template>
  </q-card>

</template>

<style scoped>

</style>