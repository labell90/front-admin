<script>
import {mapActions} from "vuex";

export default {
  name: "Options_Edit",
  mounted() {
    this.Get_Item();
    this.Get_Units();
  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      item_counter:1,
      items:{
        name:null,
        unit_id:null,
        default:null,
        description:null,
        items : [],
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
      "Module_Options_Edit",
      "Module_Options_Show",
      "Module_Units_All"
    ]),
    Add_Attributes() {
      this.items.items.push({id : this.item_counter,value:null})
      this.item_counter++;
    },
    Remove_Attributes(id){
      this.items.items = this.items.items.filter(item => item.id !== id)

    },
    Get_Item(){
      this.Module_Options_Show(this.$route.params.id).then(response => {
        if (this.items.attributes.length){
          let options = [];
          this.items.attributes.forEach(item => {
            options.push({id:this.item_counter,value:item})
            this.item_counter++;
          })
          this.items.items = options
        }
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Options_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
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
    <q-card-section v-if="loading">
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <template v-else>

      <q-card>
        <q-card-section>
          <global_actions_header_buttons :create="true" :index="true"  route="options"></global_actions_header_buttons>
          <q-separator class="q-mt-xl"/>
          <strong class="text-grey-10">ویرایش ویژگی : <span class="text-red-8">{{ items.name }}</span></strong>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام ویژگی  ">
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
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description" type="textarea" label="توضیحات">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                </template>
              </q-input>
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