<script>
import {mapActions} from "vuex";

export default {
  name: "Groups_Edit",
  mounted() {
    this.Get_Item();
    this.Get_Groups()

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      groups:[],
      items:{
        name:null,
        parent_id: null,
        color_code:null,
        description:null,
        code:null,
      }
    }
  },
  methods:{
    ...mapActions([
      "Module_Group_Action_Edit",
      "Module_Group_Action_Show",
        "Module_Group_Action_Index"
    ]),
    Get_Item(){
      this.Module_Group_Action_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Group_Action_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'groups_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },
    Get_Groups(){
      this.Module_Group_Action_Index({per_page:1000}).then(response=>{
        this.groups=[];
        response.data.result.data.forEach(item=>{
          this.groups.push({label:item.name,value:item.id,color_code : item.color_code})
        })

      })
    },
    Filter_Group_Select (val, update, abort) {
      update(() => {
        if (val){
          this.groups =  this.groups.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Groups();
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
      {{items}}
      <q-card>
        <q-card-section>
          <strong class="text-grey-10">ویرایش گروه کاربران : <span class="text-red-8">{{ items.name }}</span></strong>
          <q-btn :to="{name : 'groups_index'}" class="float-right" color="yellow-9" text-color="black" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
          <q-btn :to="{name : 'groups_create'}" class="float-right q-mr-sm" color="teal-8"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>

        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان گروه">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>
            <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-select
                  outlined
                  :options="groups"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.parent_id"
                  label="انتخاب گروه"
                  @filter="Filter_Group_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'parent_id')"
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
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'parent_id')" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input
                  :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="items.color_code" label="رنگ گروه"
              >
                <template v-slot:append>
                  <q-icon name="fas fa-eye-dropper" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="items.color_code" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'color_code')" />
                </template>
              </q-input>

            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'code')" outlined v-model="items.code"  type="text" label="کد گروه">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'code')" />
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