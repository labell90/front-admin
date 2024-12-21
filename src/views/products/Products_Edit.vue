<script>
import {mapActions} from "vuex";

export default {
  name: "Products_Edit",
  mounted() {
    this.Get_Item();
    this.Get_Product_Groups();
    this.Get_Product_Types();
  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items:{
        name:null,
        base_store_code:null,
        description:null,
        product_group_id:null,
        product_type_id:null
      },
      product_types:[],
      product_groups:[],
    }
  },
  methods:{
    ...mapActions([
        "Module_Product_Edit",
        "Module_Product_Show",
        "Module_Product_Groups_All",
        "Module_Product_Types_All"
    ]),
    Get_Item(){
      this.Module_Product_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Get_Product_Groups(){
      this.Module_Product_Groups_All().then(res => {
        if (res.data.result){
          this.product_groups=[];
          res.data.result.forEach(item => {
            this.product_groups.push({
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
    Get_Product_Types(){
      this.Module_Product_Types_All().then(res => {
        if (res.data.result){
          this.product_types=[];
          res.data.result.forEach(item => {
            this.product_types.push({
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
    Filter_Product_Groups_Select (val, update, abort) {
      update(() => {
        if (val){
          this.product_groups =  this.product_groups.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Product_Groups();
        }
      })
    },
    Filter_Product_Types_Select (val, update, abort) {
      update(() => {
        if (val){
          this.product_types =  this.product_types.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Product_Types();
        }
      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Product_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'products_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
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

      <q-card>
        <q-card-section>
          <global_actions_header_buttons :create="true"  route="products"></global_actions_header_buttons>
          <q-separator class="q-mt-xl"/>
          <strong class="text-grey-10">ویرایش محصولات : <span class="text-red-8">{{ items.name }}</span></strong>


        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام محصول">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'base_store_code')" outlined v-model="items.base_store_code"  type="text" label="کد پایه انبار">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'base_store_code')" />
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
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.product_group_id"
                  label="انتخاب گروه بندی محصولات"
                  :options="product_groups"
                  @filter="Filter_Product_Groups_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'product_group_id')"

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
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'product_group_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.product_type_id"
                  label="انتخاب نوع محصول "
                  :options="product_types"
                  @filter="Filter_Product_Types_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'product_type_id')"

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
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'product_type_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-12 q-pa-xs">
              <q-btn color="teal-8" :loading="edit_loading" @click="Edit_Item" glossy icon="fas fa-edit" label="ویرایش آیتم"></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>


    </template>
  </q-card>

</template>

<style scoped>

</style>