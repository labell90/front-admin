<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Settings_Convert",
  props:['lead'],
  data() {
    return {
      errors:[],
      convert_to_customers : false,
      convert_to_clients : false,
     customer_items:{
        name:null,
        email:null,
        phone:null,
        client_id:null,
        national_code:null,

      },
      clients:[],
      client_items:{
        client_group_id:null,
        name:null,
        email:null,
        phone:null,
        user_id:null,
        support_id:null,
        national_code:null,
      },
       client_groups:[],
      users:[],
      supports:[]
    }

  },
  methods:{
    ...mapActions([
        "Module_Users_Search",
        "Module_Client_Search"
    ]),

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
    Get_Support_Search(params){
      this.Module_Users_Search(params).then(res => {
        this.supports=[];
        res.data.result.forEach(item => {
          this.supports.push({label: item.name, value: item.id,phone: item.phone});
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
    Filter_Support_Select (val, update, abort) {
      update(() => {
        if (val && val.replace(/\s+/g, "").length > 2) {
          setTimeout(() => {
            this.Get_Support_Search({name:val})

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


    Convert_Item(){

    },

  },
}
</script>

<template>
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 q-pa-sm  ">
      <div class="rounded-borders glossy-bg row cursor-pointer " :class="{'active_select': convert_to_clients}"  @click="convert_to_clients=!convert_to_clients">
        <div class="col-lx-4 col-lg-5 col-md-6">
          <img src="assets/images/icons/client-convert.png" width="65" alt="">
        </div>
        <div class="col-lx-8 col-lg-7 col-md-6">
          <div class="q-mt-lg">
            <strong class="">تبدیل به نماینده </strong>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 q-pa-sm">
      <div class=" rounded-borders glossy-bg row cursor-pointer" :class="{'active_select': convert_to_customers}" @click="convert_to_customers=!convert_to_customers ">
        <div class="col-lx-4 col-lg-5 col-md-6">
          <img src="assets/images/icons/customer-convert.png" width="65" alt="">
        </div>
        <div class="col-lx-8 col-lg-7 col-md-6">
          <div class="q-mt-lg">
            <strong class="">تبدیل به مشتری </strong>
          </div>
        </div>
      </div>
    </div>

  </div>
  <template v-if="convert_to_customers">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="customer_items.name"  type="text" label="نام و نام خانوادگی">
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="customer_items.phone"  type="number"  label="شماره موبایل">
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'national_code')" outlined v-model="customer_items.national_code"  type="number" label="کد ملی">
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'national_code')" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="customer_items.email"  type="text" label="ایمیل">
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
            v-model="customer_items.client_id"
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


      <div class="col-12 q-pa-xs">
        <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
      </div>
    </div>

  </template>
  <template v-if="convert_to_clients">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="client_items.name"  type="text" label="نام و نام خانوادگی">
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="client_items.phone"  type="number"  label="شماره موبایل">
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'national_code')" outlined v-model="client_items.national_code"  type="number" label="کد ملی">
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'national_code')" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
        <q-input  :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="client_items.email"  type="text" label="ایمیل">
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
            v-model="client_items.client_group_id"
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
            v-model="client_items.user_id"
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
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm q-pa-xs">
        <q-select
            outlined
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="client_items.support_id"
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


      <div class="col-12 q-pa-xs">
        <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
      </div>
    </div>

  </template>

</template>

<style scoped>
.active_select{
  border: 1px solid red;
}

</style>