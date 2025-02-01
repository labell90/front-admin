<script>
import {mapActions} from "vuex";
import Client_Index from "@/views/client/Client_Index.vue";

export default {
  name: "Client_Create",
  mounted() {
    this.Get_Locations();
    this.Get_Client_Group();

  },
  //#TODO add image from media
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        client_group_id:null,
        name:null,
        email:null,
        phone:null,
        country_id:null,
        province_id:null,
        user_id:null,
        support_id:null,
        city_id:null,
        password : null,
        password_confirmation : null,
        bio : null,
        national_code:null,
        postal_code : null,
        address : null,
        tel : null,
        fax : null,
        company : null,
        company_tel : null,
        company_address:null,
        company_website:null,
        company_postal_code:null,
        description:null,
      },
      countries:[],
      provinces:[],
      cities:[],
      locations:[],
      client_groups:[],
      users:[],
      supports:[]
    }
  },
  methods:{
    ...mapActions([
        "Module_Client_Create",
        "Module_Location_Action_Country_Selectable",
        "Module_Location_Action_Province_Selectable",
        "Module_Location_Action_City_Selectable",
        "Module_Location_Action_Index",
        "Module_Client_Groups_All",
        "Module_Users_Search"
    ]),
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
    Get_Client_Group(){
      this.Module_Client_Groups_All().then(res => {
        if (res.data.result){
          this.client_groups=[];
          res.data.result.forEach(item => {
            this.client_groups.push({
              label : item.name,
              value : item.id,
              color_code : item.color_code
            })
          })
        }


      }).catch(error => {
        return this.Methods_Notify_Error_Server();
      })
    },
    Get_Users_Search(params){
      this.Module_Users_Search(params).then(res => {
        this.users=[];
        res.data.result.forEach(item => {
          this.users.push({label: item.name, value: item.id,phone: item.phone});
        });
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
    Filter_Client_Group_Select (val, update, abort) {
      update(() => {
        if (val){
          this.client_groups =  this.client_groups.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          // this.Computed_Get_Cities();
        }
      })
    },
    Filter_User_Select (val, update, abort) {
      update(() => {
        if (val && val.replace(/\s+/g, "").length > 2) {
          setTimeout(() => {
            this.Get_Users_Search({name:val})

          }, 600);
        }
      })
    },
    Filter_Support_Select (val, update, abort) {
      update(() => {
        if (val && val.replace(/\s+/g, "").length > 2) {
          setTimeout(() => {
            this.Get_Users_Search({name:val})

          }, 600);
        }
      })
    },
    Create_Item(){
      this.loading=true;
      this.Module_Client_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'client_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
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
    <q-card-section>
      <strong>افزودن نماینده جدید</strong>
      <global_actions_header_buttons :index="true"  route="client"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>

      <div class="row">
        <div class="col-12 q-mb-md q-pa-sm">
          <q-icon name="fas fa-user" size="30px" color="teal-8"/>
          <strong class="q-ml-sm text-grey-8">اطلاعات شخصی نماینده</strong>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام و نام خانوادگی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="items.phone"  type="number"  label="شماره موبایل">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.client_group_id"
              label="انتخاب گروه بندی"
              :options="client_groups"
              @filter="Filter_Client_Group_Select"
              emit-value
              map-options
              use-input
              clearable
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
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'client_group_id')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.user_id"
              label="انتخاب کارشناس مرتبط"
              :options="users"
              @filter="Filter_User_Select"
              emit-value
              map-options
              placeholder="برای جستجو حداقل سه حرف وارد کنید"
              use-input
              clearable
              :error="this.Methods_Validation_Check(errors,'user_id')"

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
                  <q-item-label>
                    <strong>{{ scope.opt.label }}</strong> - <span class="text-red-7">{{scope.opt.phone }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'user_id')" />
            </template>
          </q-select>

        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'national_code')" outlined v-model="items.national_code"  type="number" label="کد ملی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'national_code')" />
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.support_id"
              label="انتخاب کارشناس پشتیبان"
              :options="supports"
              @filter="Filter_Support_Select"
              emit-value
              map-options
              placeholder="برای جستجو حداقل سه حرف وارد کنید"
              use-input
              clearable
              :error="this.Methods_Validation_Check(errors,'support_id')"

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
                  <q-item-label>
                    <strong>{{ scope.opt.label }}</strong> - <span class="text-red-7">{{scope.opt.phone }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'support_id')" />
            </template>
          </q-select>

        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm q-pa-xs">
          <q-input :error="this.Methods_Validation_Check(errors,'bio')" outlined v-model="items.bio"  type="textarea" rows="4" label="بیو (توضیحاتی در مورد نماینده)">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'bio')" />
            </template>
          </q-input>
        </div>

        <div class="col-12 q-mb-md ">
          <q-icon name="fas fa-location" size="30px" color="teal-8"/>
          <strong class="q-ml-sm text-grey-8">اطلاعات مکانی</strong>
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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'postal_code')" outlined v-model="items.postal_code"  type="number" label="کد پستی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'postal_code')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'address')" outlined v-model="items.address"  type="textarea" rows="4" label="آدرس">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'address')" />
            </template>
          </q-input>
        </div>

        <div class="col-12 q-mb-md">
          <q-icon name="fas fa-list" size="30px" color="teal-8"/>
          <strong class="q-ml-sm text-grey-8">اطلاعات اضافه</strong>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'tel')" outlined v-model="items.tel"  type="number" label="شماره تلفن ثابت">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tel')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'fax')" outlined v-model="items.fax"  type="text" label="فکس">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'fax')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'company')" outlined v-model="items.company"  type="text" label="عنوان شرکت">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'company')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'company_tel')" outlined v-model="items.company_tel"  type="text" label="تلفن شرکت">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'company_tel')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'company_website')" outlined v-model="items.company_website"  type="text" label="وبسایت شرکت">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'company_website')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'company_address')" outlined v-model="items.company_address"  type="textarea" rows="4" label="آدرس شرکت">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'company_address')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description"  type="textarea" rows="4" label="توضیحات">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
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