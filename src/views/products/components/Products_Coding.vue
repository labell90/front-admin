<script>
import {mapActions} from "vuex";

export default {
  name: "Products_Coding",
  props:['product'],
  mounted() {
    if (this.product){
    this.items.id = this.product.id;
    }
  },
  data(){
    return{
      items:{
        provider_id:null,
        product_coding_id:null,
        id:null
      },
      provider:[],
      products_coding:[]

    }
  },
  methods:{
    ...mapActions([
      "Module_Providers_All",
      "Module_Products_Coding_All"

    ]),

    Get_Providers(){
      this.Module_Providers_All().then(res => {
        if (res.data.result){
          this.provider=[];
          res.data.result.forEach(item => {
            this.provider.push({
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
    Get_Products_Coding(){
      this.Module_Products_Coding_All().then(res => {
        if (res.data.result){
          this.products_coding=[];
          res.data.result.forEach(item => {
            this.products_coding.push({
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
    Filter_Products_Select (val, update, abort) {
      update(() => {
        if (val){
          this.products_coding =  this.products_coding.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Products_Coding();
        }
      })
    },
    Filter_Providers_Select (val, update, abort) {
      update(() => {
        if (val){
          this.provider =  this.provider.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Providers();
        }
      })
    },

  },
}

</script>

<template>
<div class="row">
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-md q-pa-md ">
    <q-select
        outlined
        transition-show="flip-up"
        transition-hide="flip-down"
        v-model="items.provider_id"
        label="انتخاب تامین کننده"
        :options="provider"
        @filter="Filter_Providers_Select"
        emit-value
        map-options
        use-input
        :error="this.Methods_Validation_Check(errors,'provider_id')"

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
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'provider_id')" />
      </template>
    </q-select>
  </div>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-md q-pa-md ">
    <q-select
        outlined
        transition-show="flip-up"
        transition-hide="flip-down"
        v-model="items.product_coding_id"
        label="انتخاب کد گذاری محصول"
        :options="products_coding"
        @filter="Filter_Products_Select"
        emit-value
        map-options
        use-input
        :error="this.Methods_Validation_Check(errors,'product_coding_id')"

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
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'product_coding_id')" />
      </template>
    </q-select>
  </div>
  <div class=" q-pa-md text-right">
    <q-btn color="grey-7" glossy label="بستن" v-close-popup icon="fas fa-times" ></q-btn>
    <q-btn color="pink-7" glossy label="انجام عملیات" class="q-ml-sm" icon="fas fa-check" ></q-btn>

  </div>

</div>
</template>

<style scoped>

</style>