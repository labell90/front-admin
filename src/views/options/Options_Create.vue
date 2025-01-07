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
      item_counter:1,
      items:{
        name:null,
        unit_id:null,
        type : null,
        default:null,
        description:null,
        items : []
      },
      units:[],
      type_options : [
        {
          label : 'متنی',
          value: 'text',
          icon : "fas fa-file-lines"
        },
        {
          label : 'عددی',
          value: 'number',
          icon : "fas fa-hashtag"

        },
        {
          label : 'چند گزینه ای ',
          value: 'select',
          icon : "fas fa-table-list"

        }
      ]

    }
  },
  methods:{
    ...mapActions([
      "Module_Options_Create",
        "Module_Units_All"
    ]),
    Add_Attributes() {
      this.items.items.push({id : this.item_counter,value:null})
      this.item_counter++;
    },
    Remove_Attributes(id){
      this.items.items = this.items.items.filter(item => item.id !== id)

    },
    Create_Item(){
      this.loading=true;

      if (this.items.items.length){
        let options=[];
        this.items.items.forEach(item => {
          options.push(item.value);
        })
        this.items.items = options;
      }
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
          <q-select
            outlined
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="items.type"
            label="نوع ویژگی"
            :options="type_options"
            emit-value
            map-options
            use-input
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
              <q-icon class="q-mr-sm q-mt-xs" size="20px" color="teal-8" :name="scope.opt.icon" />
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:error>
            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'type')" />
          </template>
        </q-select>
        </div>

        <div v-if="items.type === 'select'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <div>
            <strong class="text-red">افزودن گزینه های انتخابی</strong>
            <div class="q-mt-md">
              <q-btn size="md" @click="Add_Attributes" glossy color="blue-8" icon="fas fa-plus" label="افزودن گزینه"></q-btn>
            </div>
          </div>
          <div class="q-mt-md q-mb-md row">
            <div v-for="(option,index) in items.items" class="col-md-3 q-px-sm q-mb-sm">
              <q-input outlined v-model="option.value"  type="text" :label="'گزینه ' + option.id">
                <template v-slot:append>
                  <q-btn round dense glossy size="sm" color="red-6" icon="fas fa-times" @click="Remove_Attributes(option.id)"/>
                </template>
              </q-input>
            </div>
          </div>
          <q-separator/>
        </div>


        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-md">
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