<script>
import {mapActions} from "vuex";

export default {
  name: "Customer_Edit",
  created() {
    this.Get_Item();
    this.Get_Locations();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items:{
        name:null,
        email:null,
        phone:null,
        client_id:null,
        lead_id:null,
        user_id:null,
        country_id:null,
        province_id:null,
        city_id:null,
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
      clients:[],
      leads:[],
      users:[],
    }
  },
  methods:{
    ...mapActions([
      "Module_Customer_Show",
      "Module_Customer_Edit",
      "Module_Location_Action_Country_Selectable",
      "Module_Location_Action_Province_Selectable",
      "Module_Location_Action_City_Selectable",
      "Module_Location_Action_Index",
      "Module_Client_Search",
      "Module_Users_Search",
      "Module_Lead_Action_All"


    ]),
    Get_Item(){
      this.Module_Customer_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        //check lead and client and user exist
        if (this.items.lead){
          //push lead in leads
          this.leads.push({label: this.items.lead.name, value: this.items.lead.id,is_active:this.items.lead.is_active,phone: this.items.lead.phone})
        }
        if (this.items.user){
          //push lead in leads
          this.users.push({label: this.items.user.name, value: this.items.user.id,phone: this.items.user.phone})
        }
        if (this.items.client){
          //push lead in leads
          this.clients.push({label: this.items.client.name, value: this.items.client.id,is_active:this.items.client.is_active,phone: this.items.client.phone})
        }


        this.loading=false;
      }).catch(error =>{
        return this.Methods_Notify_Error_NotFound();
      })
    },
    Edit_Item(){
      this.edit_loading=true;
      this.Module_Customer_Edit(this.items).then(response => {
        this.edit_loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'customer_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.Methods_Notify_Error_Server();
        this.edit_loading=false;
      })
    },

    Get_Clients_Search(params){
      this.Module_Client_Search(params).then(res => {
        this.clients=[];
        res.data.result.forEach(item => {
          this.clients.push({label: item.name, value: item.id,is_active:item.is_active,phone: item.phone});
        });
      }).catch(error => {
        this.Methods_Notify_Error_Server();
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
    Filter_Client_Select (val, update, abort) {
      update(() => {
        if (val && val.replace(/\s+/g, "").length > 2) {
          setTimeout(() => {
            this.Get_Clients_Search({name:val})

          }, 600);
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
    Get_Leads_Search(params){
      this.Module_Lead_Action_All(params).then(res => {
        this.leads=[];
        res.data.result.forEach(item => {
          this.leads.push({label: item.name, value: item.id,is_active:item.is_active,phone: item.phone});
        });
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Filter_Lead_Select (val, update, abort) {
      update(() => {
        if (val && val.replace(/\s+/g, "").length > 2) {
          setTimeout(() => {
            this.Get_Leads_Search({name:val})

          }, 600);
        }
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
        this.Get_Provinces()

      }).catch(error =>{
      })
    },
    Get_Provinces(){
      if (this.items.country_id){
        let items = {
          locations : this.locations,
          country_id : this.items.country_id
        }
        this.Module_Location_Action_Province_Selectable(items).then(response => {
          this.provinces = response;
          this.Get_Cities();
        });
      }
    },
    Get_Cities(){
      if (this.items.province_id){
        let items = {
          provinces : this.provinces,
          province_id : this.items.province_id
        }
        this.Module_Location_Action_City_Selectable(items).then(response => {
          this.cities = response;
        });
      }
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
          this.Get_Provinces();
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
          // this.items.city_id = null;

          this.cities = response;
        });
      }
    },

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
        <strong class="text-grey-10">ویرایش اطلاعات مشتری : <strong class="text-red-7">{{items.name}}</strong> </strong>
        <global_actions_header_buttons :create="true"  route="customer"></global_actions_header_buttons>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md q-pa-sm">
            <q-icon name="fas fa-user" size="30px" color="teal-8"/>
            <strong class="q-ml-sm text-grey-8">اطلاعات شخصی مشتری</strong>
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

          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.client_id"
                label="انتخاب نماینده"
                :options="clients"
                @filter="Filter_Client_Select"
                emit-value
                map-options
                placeholder="برای جستجو حداقل سه حرف وارد کنید"
                use-input
                clearable
                use-chips
                :error="this.Methods_Validation_Check(errors,'client_id')"

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
                      <q-icon v-if="scope.opt.is_active" name="fas fa-check-circle" size="xs" color="green-8" class="q-mr-xs" title="وضعیت فعال"></q-icon>
                      <q-icon v-else name="fas fa-times-circle" size="xs" color="red-8" class="q-mr-xs" title="وضعیت غیرفعال"></q-icon>
                      {{ scope.opt.label }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'client_id')" />
              </template>
            </q-select>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.lead_id"
                label="انتخاب سرنخ مرتبط"
                :options="leads"
                @filter="Filter_Lead_Select"
                emit-value
                map-options
                placeholder="برای جستجو حداقل سه حرف وارد کنید"
                use-input
                clearable
                :error="this.Methods_Validation_Check(errors,'lead_id')"

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
                      <q-icon v-if="scope.opt.is_active" name="fas fa-check-circle" size="xs" color="green-8" class="q-mr-xs" title="وضعیت فعال"></q-icon>
                      <q-icon v-else name="fas fa-times-circle" size="xs" color="red-8" class="q-mr-xs" title="وضعیت غیرفعال"></q-icon>
                      {{ scope.opt.label }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_id')" />
              </template>
            </q-select>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.user_id"
                label="انتخاب کاربر (مدیر) مرتبط"
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
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.city_id"
                label="انتخاب شهر"
                :options="cities"
                @change="Computed_Get_Cities"
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
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
            <q-input :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description"  type="textarea" rows="4" label="توضیحات">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
              </template>
            </q-input>
          </div>

          <div class="col-12 q-pa-xs">
            <q-btn color="blue-8" :loading="edit_loading" @click="Edit_Item" glossy icon="fas fa-edit" label="ویرایش آیتم"></q-btn>
          </div>
        </div>


      </q-card-section>
    </template>
  </q-card>
</template>
<style scoped>


</style>