<script>
import {mapActions} from "vuex";

export default {
  name: "Stores_Edit",
  created() {
    this.Get_Item();
    this.Get_Locations();
    this.Get_Store_types();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items:{
        name:null,
        color_code:'#ba2d8d',
        sender_name:null,
        country_id:null,
        province_id:null,
        customer_id:null,
        store_type_id:null,
        city_id:null,
        client_id : null,
        sender_phone : null,
        postal_code : null,
        address : null,
        description:null,
      },
      countries:[],
      provinces:[],
      cities:[],
      locations:[],
      store_types:[],
      clients:[],
      customers:[],
    }
  },
  methods:{
    ...mapActions([
      "Module_Stores_Show",
      "Module_Stores_Edit",
      "Module_Location_Action_Country_Selectable",
      "Module_Location_Action_Province_Selectable",
      "Module_Location_Action_City_Selectable",
      "Module_Location_Action_Index",
      "Module_Stores_Types_All",
      "Module_Client_Search",
      "Module_Customer_Search"


    ]),
    Get_Item(){
      this.Module_Stores_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        if (this.items.client){
          this.clients.push({label: this.items.client.name, value: this.items.client.id,is_active:this.items.client.is_active,phone: this.items.client.phone});
        }
        if (this.items.customer){
          this.customers.push({label: this.items.customer.name, value: this.items.customer.id,is_active:this.items.customer.is_active,phone: this.items.customer.phone});
        }
        this.loading=false;
      }).catch(error =>{
        return this.Methods_Notify_Error_NotFound();
      })
    },
    Edit_Item(){
      this.edit_loading=true;
      this.Module_Stores_Edit(this.items).then(response => {
        this.edit_loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'stores_index'});
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
        let items= {
          provinces : this.provinces,
          province_id : this.items.province_id
        }
        this.Module_Location_Action_City_Selectable(items).then(response => {
          this.cities = response;
        });
      }
    },
    Get_Store_types(){
      this.Module_Stores_Types_All().then(res => {
        this.store_types=[];
        res.data.result.forEach(item => {
          this.store_types.push({label: item.name, value: item.id,color_code : item.color_code});
        })
      }).catch(error => {
        this.Methods_Notify_Error_Server();

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
    Get_Customers_Search(params){
      this.Module_Customer_Search(params).then(res => {
        this.customers=[];
        res.data.result.forEach(item => {
          this.customers.push({label: item.name, value: item.id,is_active:item.is_active,phone: item.phone});
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
          this.Get_Provinces();
        }
      })
    },
    Filter_Store_Types_Select (val, update, abort) {
      update(() => {
        if (val){
          this.store_types =  this.store_types.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Store_types();
        }
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
    Filter_Customer_Select (val, update, abort) {
      update(() => {
        if (val && val.replace(/\s+/g, "").length > 2) {
          setTimeout(() => {
            this.Get_Customers_Search({name:val})

          }, 600);
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
        <strong class="text-grey-10">ویرایش انبار : <strong class="text-red-8">{{items.name}}</strong></strong>
        <global_actions_header_buttons :create="true"  route="stores"></global_actions_header_buttons>
        <q-separator class="q-mt-xl"/>

      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام انبار">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'sender_name')" outlined v-model="items.sender_name"  type="text"  label="فرستنده ">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'sender_name')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'sender_phone')" outlined v-model="items.sender_phone"  type="number" label=" تلفن فرستنده">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'sender_phone')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
            <q-input
                :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="items.color_code" label="رنگ  "
            >
              <template v-slot:append>
                <q-icon name="fas fa-eye-dropper" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="items.color_code" />
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'color_code')" />
              </template>
            </q-input>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'postal_code')" outlined v-model="items.postal_code"  type="number" label=" کد پستی ">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'postal_code')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.store_type_id"
                label="انتخاب نوع انبار"
                :options="store_types"
                @filter="Filter_Store_Types_Select"
                emit-value
                map-options
                use-input
                :error="this.Methods_Validation_Check(errors,'store_type_id')"
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
              </template>            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'store_type_id')" />
            </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
            <q-input :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description"  type="textarea" rows="4" label="توضیحات">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
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
                v-model="items.customer_id"
                label="انتخاب مشتری"
                :options="customers"
                @filter="Filter_Customer_Select"
                emit-value
                map-options
                use-chips
                clearable
                use-input
                placeholder="برای جستجو حداقل سه حرف وارد کنید"
                :error="this.Methods_Validation_Check(errors,'customer_id')"

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
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'customer_id')" />
              </template>
            </q-select>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
            <q-input :error="this.Methods_Validation_Check(errors,'address')" outlined v-model="items.address"  type="textarea" rows="4" label="آدرس">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'address')" />
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