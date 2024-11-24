<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Create",
  mounted() {
    this.Get_Location();


  },
  data(){
   return{
     loading:false,
     errors:[],
     location:[],
     countries:[],
     provinces:[],
     cities:[],
     lead_categories:[],
     lead_resources:[],
     lead_statuses:[],
     lead_industries:[],
     lead_types:[],
     lead_utm_medium:[],
     lead_utm_source:[],
     items:{
       country_id : null,
       province_id : null,
       city_id : null,
       lead_category_id : null,
       lead_resource_id : null,
       lead_status_id : null,
       lead_industry_id : null,
       lead_type_id : null,
       lead_utm_medium_id : null,
       lead_utm_source_id : null,
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
        "Module_Lead_Utmmedium_Action_Index",
        "Module_Lead_Utmsource_Action_Index",
        "Module_Lead_Action_Create",
    ]),
    Create_Item(){

      this.loading=true;
      this.Module_Lead_Action_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
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
        }).catch(error => {
          this.Methods_Notify_Error_Internal();
        })
      }
    },

    Get_Lead_Categories(){
      this.Module_Lead_Category_Action_Index({per_page:1000}).then(response => {
        if (response.data.result.data){
          this.lead_categories=[];
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
        if (response.data.result.data){
          this.lead_resources=[];
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
        if (response.data.result.data){
          this.lead_statuses=[];
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
        if (response.data.result.data){
          this.lead_industries=[];
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
        if (response.data.result.data){
          this.lead_types=[];
          response.data.result.data.forEach(type => {
            this.lead_types.push({label:type.name, value: type.id,color_code : type.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Utm_Medium(){
      this.Module_Lead_Utmmedium_Action_Index({per_page:1000}).then(response => {
        if (response.data.result.data){
          this.lead_utm_medium=[];
          response.data.result.data.forEach(type => {
            this.lead_utm_medium.push({label:type.name, value: type.id,color_code : type.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Utm_Source(){
      this.Module_Lead_Utmsource_Action_Index({per_page:1000}).then(response => {
        if (response.data.result.data){
          this.lead_utm_source=[];
          response.data.result.data.forEach(type => {
            this.lead_utm_source.push({label:type.name, value: type.id,color_code : type.color_code});
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
    Filter_Lead_Utm_Medium_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_utm_medium =  this.lead_utm_medium.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Utm_Medium();
        }
      })
    },
    Filter_Lead_Utm_Source_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_utm_source =  this.lead_utm_source.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Utm_Source();
        }
      })
    },


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
</script>

<template>

  <q-card>
    <q-card-section>
      <strong class="text-grey-10">افزودن سرنخ جدید</strong>
      <global_actions_header_buttons :index="true" :archive="true" route="lead"></global_actions_header_buttons>

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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.lead_utm_medium_id"
              label="انتخاب UTM Medium"
              :options="lead_utm_medium"
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
              :error="this.Methods_Validation_Check(errors,'province_id')"
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
              :error="this.Methods_Validation_Check(errors,'city_id')"
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
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>

      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>