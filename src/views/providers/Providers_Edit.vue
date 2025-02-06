<script>
import {mapActions} from "vuex";

export default {
  name: "Providers_Edit",
  created() {
    this.Get_Item();
    this.Get_Store_types();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items:{
        name:null,
        phone:null,
        tel:null,
        provider_category_id:null,
        address : null,
        description:null,
      },

      provider_category:[]
    }
  },
  methods:{
    ...mapActions([
      "Module_Providers_Show",
      "Module_Providers_Edit",
      "Module_Providers_Category_All",



    ]),
    Get_Item(){
      this.Module_Providers_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{
        return this.Methods_Notify_Error_NotFound();
      })
    },
    Edit_Item(){
      this.edit_loading=true;
      this.Module_Providers_Edit(this.items).then(response => {
        this.edit_loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'providers_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_loading=false;
      })
    },



    Get_Provider_Category(){
      this.Module_Providers_Category_All().then(res => {
        this.provider_category=[];
        res.data.result.forEach(item => {
          this.provider_category.push({label: item.name, value: item.id,color_code : item.color_code});
        })
      }).catch(error => {
        this.Methods_Notify_Error_Server();

      })
    },






    Filter_Provider_Category_Select (val, update, abort) {
      update(() => {
        if (val){
          this.provider_category =  this.provider_category.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Provider_Category();
        }
      })
    },





  },
  computed : {

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
        <strong class="text-grey-10">ویرایش تامین کنندگان : <strong class="text-red-8">{{items.name}}</strong></strong>
        <global_actions_header_buttons :create="true" :index="true"  route="providers"></global_actions_header_buttons>
        <q-separator class="q-mt-xl"/>

      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام تامین کنندگان">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="items.phone"  type="number"  label="موبایل تامین کنندگان ">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-input  :error="this.Methods_Validation_Check(errors,'tel')" outlined v-model="items.tel"  type="number" label=" تلفن تامین کنندگان">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tel')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
            <q-select
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="items.provider_category_id"
                label=""
                :options="provider_category"
                @filter="Filter_Provider_Category_Select"
                emit-value
                map-options
                use-input
                :error="this.Methods_Validation_Check(errors,'provider_category_id')"
            >
              <template v-slot:label>
                انتخاب دسته بندی تامین کنندگان
                <q-icon name="fa fa-star" color="red" size="12px" class="q-ml-xs"></q-icon>
              </template>
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