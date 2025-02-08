<script>
import {mapActions} from "vuex";


export default {
  name: "Providers_Create",
  mounted() {

    this.Get_Provider_Category();



  },
  //#TODO add image from media
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        phone:null,
        tel:null,
        provider_category_id:null,
        address : null,
        description:null,
      },

      provider_category:[],



    }
  },
  methods:{
    ...mapActions([
      "Module_Providers_Category_Create",
      "Module_Providers_Category_All",

    ]),

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


    Create_Item(){
      this.loading=true;
      this.Module_Stores_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'providers_index'});
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


  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong>ایجاد تامین کنندگان</strong>
      <global_actions_header_buttons :index="true"  route="providers"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>

      <div class="row">

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label=" نام تامین کنندگان">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="items.phone"  type="number"  label=" موبایل تامین کنندگان">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'tel')" outlined v-model="items.tel"  type="number" label="تلفن تامبن کنندگان ">
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm q-pa-xs">
          <q-input :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description"  type="textarea" rows="4" label=" توضیحات">
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
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>