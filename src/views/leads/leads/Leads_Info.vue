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
          <strong class="text-grey-10">اطلاعات کامل سرنخ : <span class="text-red-8">{{ items.name }}</span></strong>
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
              <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
            </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">نام و نام خانوادگی : </span>

                  <strong class="font-16">{{items.name ?? "---"}}</strong>

            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.phone">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">شماره موبایل :</span>
              <strong class="font-16">{{items.phone ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.email">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس ایمیل :</span>
              <strong class="font-16">{{items.email ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.company">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> نام شرکت  :</span>
              <strong class="font-16">{{items.company ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.company_position">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> سمت در شرکت   :</span>
              <strong class="font-16">{{items.company_position ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.tel">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> تلفن ثابت   :</span>
              <strong class="font-16">{{items.tel ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.fax">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">  فکس   :</span>
              <strong class="font-16">{{items.fax ?? "---"}}</strong>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.brand">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">  نام برند   :</span>
              <strong class="font-16">{{items.brand ?? "---"}}</strong>
            </div>


            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.description">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> توضیحات  :</span>
              <strong class="font-16">{{items.description ?? "---"}}</strong>
            </div>


            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-list" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات عمومی سرنخ</strong>
            </div>
            <div class="col-12 q-mb-md">
              <q-separator/>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy>
                  <template v-slot:append>
                    <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                  </template>

                </q-popup-proxy>
              </q-btn>

                <span class="text-pink-4 font-14 font-weight-500">دسته بندی : </span>
                <strong class="font-15" v-if="items.lead_category">{{items.lead_category.name}}</strong>
                <strong class="font-15" v-else>---</strong>

            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs0 q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب منبع  : </span>
                <strong class="font-15" v-if="items.lead_resources">{{items.lead_resources.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب صنعت  : </span>
                <strong class="font-15" v-if="items.lead_industries">{{items.lead_industries.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب وضعیت  : </span>
                <strong class="font-15" v-if="items.lead_statuses">{{items.lead_statuses.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب نوع  : </span>
                <strong class="font-15" v-if="items.lead_types">{{items.lead_types.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>



            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fas fa-location" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات مکانی</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب کشور  : </span>
                <strong class="font-15" v-if="items.countries">{{items.countries.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب استان  : </span>
                <strong class="font-15" v-if="items.provinces">{{items.provinces.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <div>
                <span class="text-pink-4 font-14 font-weight-500">انتخاب شهر  : </span>
                <strong class="font-15" v-if="items.cities">{{items.cities.name}}</strong>
                <strong class="font-15" v-else>---</strong>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.postal_code">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500">  کد پستی   :</span>
              <strong class="font-16">{{items.postal_code ?? "---"}}</strong>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.address">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس   :</span>
              <strong class="font-16">{{items.address ?? "---"}}</strong>
            </div>

            <div class="col-12 q-mb-md q-mt-lg">
              <q-icon name="fa-brands fa-instagram" size="30px" color="teal-8"/>
              <strong class="q-ml-sm">اطلاعات شبکه های اجتماعی</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.website">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> وبسایت   :</span>
              <strong class="font-16">{{items.website ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.instagram">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس اینستاگرام   :</span>
              <strong class="font-16">{{items.instagram ?? "---"}}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-md">
              <q-btn size="xs" glossy round icon="fas fa-edit" color="primary" class="q-mr-sm">
                <q-popup-proxy >
                  <q-input outlined dense v-model="items.telegram">
                    <template v-slot:append>
                      <q-btn outline size="xs" color="green-7" icon="fas fa-check" round></q-btn>
                    </template>
                  </q-input>
                </q-popup-proxy>
              </q-btn>
              <span class="text-pink-4 font-14 font-weight-500"> آدرس تلگرام   :</span>
              <strong class="font-16">{{items.telegram ?? "---"}}</strong>
            </div>

            <div class="col-12 q-pa-xs q-mt-md">
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