<script>
import {mapActions} from "vuex";

export default {
  name: "Roles_Create",
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        parent_id:null,
        name:null,
        description:null,
      },
      roles:[],
    }
  },
  methods:{
    ...mapActions([
        "Module_Role_Action_Create",
        "Module_Role_Action_All"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Role_Action_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'roles_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },
    Get_Roles(){
      this.Module_Role_Action_All().then(response => {
        this.roles=[];
        response.data.result.forEach(role => {
          this.roles.push({label:role.name, value: role.id});
        })
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Filter_Roles_Select (val, update, abort) {
      update(() => {
        if (val){
          this.roles =  this.roles.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Roles();
        }
      })
    },


  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10">افزودن نقش جدید کاربر</strong>
      <global_actions_header_buttons :index="true" route="roles"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>

    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="" >
            <template v-slot:label>
              عنوان نقش
              <q-icon name="fa fa-star" color="red" size="12px" class="q-ml-xs"></q-icon>
            </template>
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
              v-model="items.parent_id"
              label="انتخاب والد"
              :options="roles"
              @filter="Filter_Roles_Select"
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