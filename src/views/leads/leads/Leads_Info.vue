<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Info",
  mounted() {
    this.Get_Item();
    this.Get_Location();
    this.Get_Lead_Categories();
    this.Get_Lead_Types();
    this.Get_Lead_Resources();
    this.Get_Lead_Industries();
    this.Get_Lead_Statuses();
    this.Get_Lead_Advsources();
    this.Get_Lead_Utm_Medium();
    this.Get_Lead_Utm_Source();

  },
  data(){
    return {
      loading:true,
      edit_loading:[],
      errors:[],
      countries:[],
      provinces:[],
      cities:[],
      lead_categories:[],
      lead_resources:[],
      lead_statuses:[],
      lead_industries:[],
      lead_types:[],
      lead_advsources:[],
      lead_utm_medium:[],
      lead_utm_source:[],
      items:{
        country_id : null,
        province_id : null,
        city_id : null,
        lead_category_id : null,
        lead_advsources_id : null,
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
      "Module_Lead_Action_Show",
      "Module_Lead_Utmmedium_Action_Index",
      "Module_Lead_Utmsource_Action_Index",
      "Module_Lead_Advsource_Action_Index",
      "Module_Lead_Action_Single_Edit",

    ]),
    Get_Item(){
      this.Module_Lead_Action_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

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
    Get_Lead_Advsources(){
      this.Module_Lead_Advsource_Action_Index({per_page:1000}).then(response => {
        if (response.data.result.data){
          this.lead_advsources=[];
          response.data.result.data.forEach(advsource => {
            this.lead_advsources.push({label:advsource.name, value: advsource.id,color_code : advsource.color_code});
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
    Filter_Lead_Advsources_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_advsources =  this.lead_advsources.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Advsources();
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
    Lead_Single_Update(key,item){
      let data = { [key] : item ,id : this.items.id}
      this.edit_loading[key] = true;
      this.Module_Lead_Action_Single_Edit(data).then(res => {
        this.Methods_Notify_Update();
        this.edit_loading[key]=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_loading[key]=false;
      })






    }



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
    <q-card-section v-if="loading">
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <template v-else>

      <q-card>
        <q-card-section>
          <strong class="text-grey-10">اطلاعات کامل سرنخ : <strong class="text-red-8">{{ items.name }}</strong></strong>
          <q-btn :to="{name : 'lead_index'}" class="float-right" color="yellow-9" text-color="black" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
          <q-btn :to="{name : 'lead_create'}" class="float-right q-mr-sm" color="pink-7"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>

        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-sm">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.name">
                  <template v-slot:append>
                    <q-btn :disable="!items.phone"  @click="Lead_Single_Update('name',items.name)" :loading="edit_loading['name']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                  </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">نام و نام خانوادگی : </span>

                  <span class="font-15 q-ml-sm">{{items.name ?? "---"}}</span>

            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.phone">
                    <template v-slot:append>
                      <q-btn :disable="!items.phone" @click="Lead_Single_Update('phone',items.phone)" :loading="edit_loading['phone']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">شماره موبایل :</span>
              <span class="font-15 q-ml-sm">{{items.phone ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.email">
                    <template v-slot:append>
                      <q-btn :disable="!items.email"  @click="Lead_Single_Update('email',items.email)" :loading="edit_loading['email']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس ایمیل :</span>
              <span class="font-15 q-ml-sm">{{items.email ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.company">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('company',items.company)" :loading="edit_loading['company']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> نام شرکت  :</span>
              <span class="font-15 q-ml-sm">{{items.company ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.company_position">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('company_position',items.company_position)" :loading="edit_loading['company_position']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> سمت در شرکت   :</span>
              <span class="font-15 q-ml-sm">{{items.company_position ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.tel">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('tel',items.tel)" :loading="edit_loading['tel']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> تلفن ثابت   :</span>
              <span class="font-15 q-ml-sm">{{items.tel ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.fax">
                    <template v-slot:append>
                      <q-btn  @click="Lead_Single_Update('fax',items.fax)" :loading="edit_loading['fax']"  outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">  فکس   :</span>
              <span class="font-15 q-ml-sm">{{items.fax ?? "---"}}</span>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.brand">
                    <template v-slot:append>
                      <q-btn  @click="Lead_Single_Update('brand',items.brand)" :loading="edit_loading['brand']"  outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">  نام برند   :</span>
              <span class="font-15 q-ml-sm">{{items.brand ?? "---"}}</span>
            </div>


            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy style="width: 80%" >
                  <q-input outlined dense v-model="items.description" type="textarea">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('description',items.description)" :loading="edit_loading['description']"  outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> توضیحات  :</span>
              <span class="font-15 q-ml-sm">{{items.description ?? "---"}}</span>
            </div>


            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-list" size="30px" color="teal-8"/>
              <span class="q-ml-sm">اطلاعات عمومی سرنخ</span>
            </div>
            <div class="col-12 q-mb-md">
              <q-separator/>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy>
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
                      dense
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
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('lead_category_id',items.lead_category_id)" :loading="edit_loading['lead_category_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-select>
                </q-popup-proxy>
              </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">دسته بندی : </span>
                <span class="font-15" v-if="items.lead_category">{{items.lead_category.name}}</span>
                <span class="font-15" v-else>---</span>
            </div>


            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs0 q-mt-md">
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
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
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_resource_id',items.lead_resource_id)" :loading="edit_loading['lead_resource_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>

                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب منبع  : </span>
                <span class="font-15" v-if="items.lead_resource">{{items.lead_resource.name}}</span>
                <span class="font-15" v-else>---</span>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
                    <q-select
                        outlined
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="items.lead_industry_id"
                        label="انتخاب صنعت"
                        :options="lead_industries"
                        @filter="Filter_Lead_Industries_Select"
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
                            <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_industry_id',items.lead_industry_id)" :loading="edit_loading['lead_industry_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>
                  </q-popup-proxy>
                </q-btn>

                <span class="text-pink-4 font-14 font-weight-500">انتخاب صنعت  : </span>
                <span class="font-15" v-if="items.lead_industry">{{items.lead_industry.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
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
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_status_id',items.lead_status_id)" :loading="edit_loading['lead_status_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>

                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب وضعیت  : </span>
                <span class="font-15" v-if="items.lead_status">{{items.lead_status.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
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
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_type_id',items.lead_type_id)" :loading="edit_loading['lead_type_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>

                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب نوع  : </span>
                <span class="font-15" v-if="items.lead_type">{{items.lead_type.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
                    <q-select
                        outlined
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="items.lead_utm_medium_id"
                        label="انتخاب UTM Medium"
                        :options="lead_utm_medium"
                        @filter="Filter_Lead_Utm_Medium_Select"
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
                            <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>

                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_utm_medium_id',items.lead_utm_medium_id)" :loading="edit_loading['lead_utm_medium_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>

                    </q-select>
                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب UTM Medium  : </span>
                <span class="font-15" v-if="items.lead_utm_medium">{{items.lead_utm_medium.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
                    <q-select
                        outlined
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="items.lead_utm_source_id"
                        label="انتخاب UTM Source"
                        :options="lead_utm_source"
                        @filter="Filter_Lead_Utm_Source_Select"
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
                            <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>

                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_utm_source_id',items.lead_utm_source_id)" :loading="edit_loading['lead_utm_source_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>
                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب UTM Source  : </span>
                <span class="font-15" v-if="items.lead_utm_source">{{items.lead_utm_source.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
                    <q-select
                        outlined
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="items.lead_advsources_id"
                        label="انتخاب منبع تبلیغ"
                        :options="lead_advsources"
                        @filter="Filter_Lead_Advsources_Select"
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
                            <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('lead_advsources_id',items.lead_advsources_id)" :loading="edit_loading['lead_advsources_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>

                    </q-select>

                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب منبع تبلیغ : </span>
                <span class="font-15" v-if="items.lead_advsource">{{items.lead_advsource.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-location" size="30px" color="teal-8"/>
              <span class="q-ml-sm">اطلاعات مکانی</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
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
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('country_id',items.country_id)" :loading="edit_loading['country_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>
                  </q-popup-proxy>
                </q-btn>

                <span class="text-pink-4 font-14 font-weight-500">انتخاب کشور  : </span>
                <span class="font-15" v-if="items.countries">{{items.countries.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
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
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('province_id',items.province_id)" :loading="edit_loading['province_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>


                  </q-popup-proxy>
                </q-btn>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب استان  : </span>
                <span class="font-15" v-if="items.provinces">{{items.provinces.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>

                <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                  <q-popup-proxy>
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
                      <template v-slot:append>
                        <q-btn @click="Lead_Single_Update('city_id',items.city_id)" :loading="edit_loading['city_id']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                      </template>
                    </q-select>
                  </q-popup-proxy>
                </q-btn>

                <span class="text-pink-4 font-14 font-weight-500">انتخاب شهر  : </span>
                <span class="font-15" v-if="items.cities">{{items.cities.name}}</span>
                <span class="font-15" v-else>---</span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.postal_code">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('postal_code',items.postal_code)" :loading="edit_loading['postal_code']"   outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">  کد پستی   :</span>
              <span class="font-15 q-ml-sm">{{items.postal_code ?? "---"}}</span>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.address" type="textarea" style="width: 80%">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('address',items.address)" :loading="edit_loading['address']" outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس   :</span>
              <span class="font-15 q-ml-sm">{{items.address ?? "---"}}</span>
            </div>

            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fa-brands fa-instagram" size="30px" color="teal-8"/>
              <span class="q-ml-sm">اطلاعات شبکه های اجتماعی</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.website">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('website',items.website)" :loading="edit_loading['website']"  outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> وبسایت   :</span>
              <span class="font-15 q-ml-sm">{{items.website ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.instagram">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('instagram',items.instagram)" :loading="edit_loading['instagram']"  outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس اینستاگرام   :</span>
              <span class="font-15 q-ml-sm">{{items.instagram ?? "---"}}</span>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.telegram">
                    <template v-slot:append>
                      <q-btn @click="Lead_Single_Update('telegram',items.telegram)" :loading="edit_loading['telegram']"  outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس تلگرام   :</span>
              <span class="font-15 q-ml-sm">{{items.telegram ?? "---"}}</span>
            </div>

          </div>
        </q-card-section>
      </q-card>


    </template>
  </q-card>

</template>

<style scoped>

</style>