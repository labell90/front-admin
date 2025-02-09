<script>
import {mapActions} from "vuex";

export default {
  name: "Opportunities_Create",
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        customer_id:null,
        description:null,
        price:null,
        opportunity_levels_id:null,
        opportunity_statuses_id:null,
      },
      customers:[],
      levels:[],
      statuses:[]
    }
  },
  methods:{
    ...mapActions([
      "Module_Opportunities_Action_Create",
        "Module_Customer_Search",
        "Module_Opportunity_Levels_Action_All"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Opportunities_Action_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'opportunities_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },
    Get_Customers_Search(params){
      this.Module_Customer_Search(params).then(res => {
        this.customers=[];
        res.data.result.forEach(item => {
          this.customers.push({label: item.name, value: item.id,phone: item.phone});
        });
      }).catch(error => {
        this.Methods_Notify_Error_Server();
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
    Get_Opportunity_Levels(){
      this.Module_Opportunity_Levels_Action_All().then(res => {
        if (res.data.result){
          this.statuses=[];
          res.data.result.forEach(item => {
            this.levels.push({
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
    Get_Opportunity_Statuses(){
      this.Module_Opportunity_Statuses_All().then(res => {
        if (res.data.result){
          this.statuses=[];
          res.data.result.forEach(item => {
            this.statuses.push({
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
    Filter_Opportunity_Levels_Select (val, update, abort) {
      update(() => {
        if (val){
          this.levels =  this.levels.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          // this.Computed_Get_Cities();
        }
      })
    },
    Filter_Opportunity_Statuses_Select (val, update, abort) {
      update(() => {
        if (val){
          this.statuses =  this.statuses.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          // this.Computed_Get_Cities();
        }
      })
    },

  }
}
</script>

<template>

  <q-card>
    <q-card-section>
      <strong class="text-grey-10">افزودن فرصت فروش</strong>
      <global_actions_header_buttons :index="true"  route="opportunities"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>

    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان فرصت فروش">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'price')" outlined v-model="items.price"  type="number" label=" قیمت فرصت فروش">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'price')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.customer_id"
              label="انتخاب مشتریان"
              :options="customers"
              @filter="Filter_Customer_Select"
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
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'customer_id')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.opportunity_levels_id"
              label="انتخاب مرحله فرصت فروش"
              :options="levels"
              @filter="Filter_Opportunity_Levels_Select"
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
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'opportunity_levels_id')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.opportunity_statuses_id"
              label="انتخاب وضعیت فرصت فروش"
              :options="statuses"
              @filter="Filter_Opportunity_Statuses_Select"
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
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'opportunity_statuses_id')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description" type="textarea" label="توضیحات">
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