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

    }

  },
  methods:{
    ...mapActions([
        "Module_Role_Action_Show",
        "Module_Role_Action_Edit",
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




    }


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