<script>
import {mapActions} from "vuex";

export default {
  name: "Options_Create",
  mounted() {
    this.Get_Units();
  },
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        unit_id:null,
        default:null,
        description:null,
      },
      units:[],
    }
  },
  methods:{
    ...mapActions([
      "Module_Options_Create",
        "Module_Units_All"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Options_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'options_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
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

  }
}
</script>

<template>

  <q-card>
    <q-card-section>
      <strong class="text-grey-10"> افزودن ویژگی ها</strong>
      <global_actions_header_buttons :index="true" route="options"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>

    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام ویژگی ">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
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

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'default')" outlined v-model="items.default"  type="text" label="مقدار پیش فرض">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'default')" />
            </template>
          </q-input>
          <q-banner dense class="rounded-borders bg-blue-9 q-mb-md text-white">
            <q-icon name="fas fa-info-circle fa-fade" size="xs" class="q-mr-sm"></q-icon>
            هنگام استفاده از ویژگی در محصولات و ... ، اگر مقدار پیش فرض وجود داشته باشد و مقدار دلخواه توسط کاربر وارد نشود ، مقدار پیش فرض به عنوان مقدار ویژگی ثبت میشود
          </q-banner>
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