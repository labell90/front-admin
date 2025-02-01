<script>
import {mapActions} from "vuex";
import leads_tags from "@/views/leads/leads/profile/components/Leads_Profile_Tags.vue";

export default {
  name: "Products_Create",
  components: {leads_tags},
  mounted() {
    this.Get_Product_Groups();
    this.Get_Product_Types();
    this.Get_Options();
    this.Get_Units();
  },
  data(){
    return {
      loading:false,
      errors:[],
      options_dialog:false,
      product_types:[],
      product_groups:[],
      items:{
        name:null,
        base_store_code:null,
        description:null,
        product_group_id:null,
        product_type_id:null,
        unit_id:null,
        inventory_status:1,
        tax_status:1,
        exit_status:1,
        is_special:0,
        options:{},
      },
      original_options:[],
      options:[],
      final_options:[],
      units:[],
      inventory_statuses:[
        {
          label : "بله",
          value : 1,
        },
        {
          label : "خیر",
          value : 0,
        }
      ],
      exit_statuses:[
        {
          label : "بله",
          value : 1,
        },
        {
          label : "خیر",
          value : 0,
        }
      ],
      tax_statuses:[
        {
          label : "بله",
          value : 1,
        },
        {
          label : "خیر",
          value : 0,
        }
      ],
      special_statuses:[
        {
          label : "بله",
          value : 1,
        },
        {
          label : "خیر",
          value : 0,
        }
      ],
      selected_option:null,
    }
  },
  methods:{
    ...mapActions([
        "Module_Product_Create",
        "Module_Product_Types_All",
        "Module_Product_Groups_All",
        "Module_Options_All",
        "Module_Units_All"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Product_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'products_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
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
    Get_Options(){
      this.Module_Options_All().then(res => {
        if (res.data.result){
          this.original_options = res.data.result
          this.options=[];
          res.data.result.forEach(item => {
            this.options.push({
              label : item.name,
              value : item.id,
            })
          })
        }


      }).catch(error => {
        return this.Methods_Notify_Error_Server();
      })
    },
    Get_Units(){
      this.Module_Units_All().then(res => {
        this.units=[];
        res.data.result.forEach(item =>{
          this.units.push({label:item.name,value:item.id,symbol:item.symbol});
        })
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Select_Option(id){
      let option
      this.original_options.forEach(item => {
        if (id === item.id){
          option = item;
        }
      })
      return option;
    },
    Make_Select_Option(attributes){
      let options=[];
      if(attributes){
        attributes.forEach(item => {
          options.push({
            label : item.attribute,
            value : item.attribute,
          })
        })
      }
      return options;
    },
    Add_Option_To(id){
      this.original_options.forEach(item => {
        if(item.id === id){
          this.final_options.push({
            option : item,
            value : this.items.options[id]
          });
        }
      })
      this.options= this.options.filter(item=>{
        return item.value !== id;
      })
      this.selected_option=null;
      this.options_dialog=false;
    },
    Remove_Option(id){
      delete this.items.options[id];
      this.final_options = this.final_options.filter(item=>{
        return item.option.id !== id;
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
    Filter_Units_Select (val, update, abort) {
      update(() => {
        if (val){
          this.units =  this.units.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Units();
        }
      })
    },
  },
}
</script>

<template>

  <q-card>


    <q-card-section>
      <strong class="text-grey-10"> افزودن محصولات</strong>
      <global_actions_header_buttons :index="true" route="products"></global_actions_header_buttons>

      <q-separator class="q-mt-xl"/>

    </q-card-section>


    <q-card-section>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام محصول ">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'base_store_code')" outlined v-model="items.base_store_code"  type="text" label="کد پایه انبار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'base_store_code')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
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
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.unit_id"
              label="انتخاب یکا اندازه گیری"
              :options="units"
              @filter="Filter_Units_Select"
              emit-value
              map-options
              use-input
              :error="this.Methods_Validation_Check(errors,'unit_id')"
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
                    <strong>
                      {{ scope.opt.label }}
                    </strong>
                    <q-chip size="xs" class="font-12 glossy" color="blue-8" :label="scope.opt.symbol" text-color="white"></q-chip>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'unit_id')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.inventory_status"
              label="کنترل موجودی"
              :options="inventory_statuses"
              emit-value
              map-options
              :error="this.Methods_Validation_Check(errors,'inventory_status')"
          >
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'inventory_status')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.exit_status"
              label="خروج از انبار"
              :options="exit_statuses"
              emit-value
              map-options
              :error="this.Methods_Validation_Check(errors,'exit_status')"
          >
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'exit_status')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.tax_status"
              label="شامل مالیات"
              :options="tax_statuses"
              emit-value
              map-options
              :error="this.Methods_Validation_Check(errors,'tax_status')"
          >
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tax_status')" />
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.tax_status"
              label="محصول ویژه است"
              :options="tax_statuses"
              emit-value
              map-options
              :error="this.Methods_Validation_Check(errors,'tax_status')"
          >
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'tax_status')" />
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <strong class="font-15 text-teal-8">ویژگی های محصول : </strong>
          <div class="q-mt-md">
            <q-btn @click="options_dialog = true" glossy rounded label="افزودن ویژگی" color="blue" class="q-mb-md" icon="fas fa-plus-circle"></q-btn>
            <q-dialog
                v-model="options_dialog"
                position="top"
            >
              <q-card style="width: 960px; max-width: 80vw;">
                <q-card-section>
                  <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm float-right"/>
                  <strong class="font-15">افرودن ویژگی به محصول</strong>
                </q-card-section>
                <q-separator/>
                <q-card-section>

                  <q-select
                      outlined
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="selected_option"
                      label="انتخاب ویژگی"
                      :options="options"
                      emit-value
                      map-options
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
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <div v-if="selected_option" class="q-mt-lg q-mb-md">
                    <template v-if=" Get_Select_Option(selected_option).type === 'select'">
                      <q-select
                          outlined
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          v-model="items.options[selected_option]"
                          label="انتخاب مقدار"
                          :options="Make_Select_Option(Get_Select_Option(selected_option).attributes)"
                          emit-value
                          map-options
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
                            <q-item-section>
                              <q-item-label>{{ scope.opt.label }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </template>
                    <template v-else>
                      <q-input  outlined v-model="items.options[selected_option]"  type="text" label="وارد کردن مقدار">
                      </q-input>
                    </template>
                  </div>
                  <div class="text-right q-mt-xl">
                    <q-btn  color="grey-8" label="بستن" glossy push class="q-mr-sm" v-close-popup icon="fas fa-times"></q-btn>
                    <q-btn @click="Add_Option_To(selected_option)" :disable="!selected_option" color="blue-8" label="افزودن ویژگی" glossy push icon="fas fa-plus"></q-btn>
                  </div>
                </q-card-section>

              </q-card>
            </q-dialog>

            <template v-if="items.options.length < 1">
              <q-banner dense class="bg-teal-5 text-white rounded-borders text-center">
                <strong>
                  هیج ویژگی انتخاب نشده است
                </strong>
              </q-banner>
            </template>
            <template v-else>
              <div class="q-mt-smq-mb-md q-px-md row">
                <div v-for="option in final_options" class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
                  <div class="option-box bg-blue-grey-1">
                    <span class="text-deep-orange-8">
                      {{option.option.name}} :
                    </span>
                    <span @click="Remove_Option(option.option.id)" class="float-right q-ml-sm q-mt-xs cursor-pointer">
                      <q-icon size="xs" name="fas fa-trash" color="red-5"></q-icon>
                    </span>
                    <span class="float-right">
                      <q-chip size="xs" color="blue-6" text-color="white" class="font-10">{{option.option.unit.symbol}}</q-chip>
                    </span>
                    <strong class="float-right q-mt-xs">
                      {{option.value}}
                    </strong>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="col-12 q-pa-xs q-mt-md">
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>
.option-box {
  border-radius: 7px;
  padding: 20px 15px;

}

</style>