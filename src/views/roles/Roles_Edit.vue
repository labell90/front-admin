<script>
import {mapActions} from "vuex";

export default {
  name: "Roles_Edit",
  mounted() {
    this.Get_Item();
  },
  data(){

    return {
      loading:true,
      edit_loading:false,
      errors:[],
      item:null,
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
        "Module_Role_Action_Show",
        "Module_Role_Action_Edit",
         "Module_Role_Action_All"

    ]),
    Get_Item(){
      this.Module_Role_Action_Show(this.$route.params.id).then(response => {
        this.item=response.data.result;
        this.loading=false;
      }).catch(error => {
        if (error.response.status === 404) {
          this.Methods_Notify_Error_NotFound();
        }else {
            this.Methods_Notify_Error_Server();
        }
        this.loading=false;
      })
    },
    Edit_Item(){
      this.edit_loading=true;
      this.Module_Role_Action_Edit(this.item).then(response => {
          this.Methods_Notify_Update();
          this.edit_loading=false;
          this.$router.push({name : 'roles_index'})
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data;
          this.Methods_Validation_Notify();
        }else {
            this.Methods_Notify_Error_Server();
        }
        this.edit_loading=false;
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
  <global_loading_shape v-if="loading" size="65"></global_loading_shape>
  <q-card v-else>
    <q-card-section>
      <strong class="text-grey-10">ویرایش نقش : <span class="text-red-8">{{ item.name }}</span></strong>
      <global_actions_header_buttons :create="true" route="roles"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="item.name"  type="text" label="عنوان نقش">
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="item.description"  type="textarea" label="توضیحات">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pa-sm">
          <q-btn color="blue-8" :loading="edit_loading" @click="Edit_Item" glossy icon="fas fa-edit" label="ویرایش آیتم"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>