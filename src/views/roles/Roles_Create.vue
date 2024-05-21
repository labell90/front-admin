<script>
import {mapActions} from "vuex";

export default {
  name: "Roles_Create",
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        description:null,
      }
    }
  },
  methods:{
    ...mapActions([
        "Module_Role_Action_Create"
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


  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10">افزودن نقش جدید کاربر</strong>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input dense :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان نقش">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input dense :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description" type="textarea" label="توضیحات">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pa-sm">
          <q-btn color="teal-8" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>