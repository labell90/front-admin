<script>
import {mapActions} from "vuex";

export default {
  name: "Units_Create",
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        symbol:null,
        description:null,
      }
    }
  },
  methods:{
    ...mapActions([
      "Module_Units_Create"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Units_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'units_index'});
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
      <strong class="text-grey-10"> افزودن یکای اندازه گیری </strong>
      <global_actions_header_buttons :index="true" route="units"></global_actions_header_buttons>

      <q-separator class="q-mt-xl"/>



    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'symbol')" outlined v-model="items.symbol"  type="text" label="یکا">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'symbol')" />
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
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>