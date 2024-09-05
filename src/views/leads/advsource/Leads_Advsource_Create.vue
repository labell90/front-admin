<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Advsource_Create",
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        color_code:'#ba2d8d',
        description:null,
        code:null,
      }
    }
  },
  methods:{
    ...mapActions([
      "Module_Lead_Advsource_Action_Create"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Lead_Advsource_Action_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'lead_advsource_index'});
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
      <strong class="text-grey-10">افزودن منبع سرنخ جدید</strong>
      <q-btn :to="{name : 'lead_advsource_index'}" class="float-right" color="blue-8"  glossy icon="fas fa-list" label="لیست موارد"></q-btn>

    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان منبع تبلیغ">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input
              :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="items.color_code" label="رنگ منبع تبلیغ"
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
          <q-input  :error="this.Methods_Validation_Check(errors,'code')" outlined v-model="items.code"  type="text" label="کد منبع تبلیغ">
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
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>