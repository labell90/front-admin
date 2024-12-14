<script>
import {mapActions} from "vuex";

export default {
  name: "Products_Edit",
  mounted() {
    this.Get_Item();
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
      }
    }
  },
  methods:{
    ...mapActions([
      "Module_Product_Edit",
      "Module_Product_Show"
    ]),
    Get_Item(){
      this.Module_Product_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

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
                  label="انتخاب از گروه بندی محصولات  "
                  :options="cv"
                  @filter=""
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
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_category_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.product_type_id"
                  label="انتخاب از نوع محصول "
                  :options="vh"
                  @filter=""
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