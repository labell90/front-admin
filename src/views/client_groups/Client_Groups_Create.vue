<script>
import {mapActions} from "vuex";
import Client_Groups_Index from "@/views/client_groups/Client_Groups_Index.vue";

export default {
  name: "Clients_Groups_Create",
  //#TODO add image from media
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        color_code:'#ba2d8d',
        code:null,
        discount_percent:0,
      }
    }
  },
  methods:{
    ...mapActions([
      "Module_Client_Groups_Create"
    ]),
    Create_Item(){
      this.loading=true;
      this.Module_Client_Groups_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'client_groups_index'});
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
      <strong class="text-grey-10">افزودن گروه بندی جدید</strong>
      <global_actions_header_buttons :index="true"  route="client_groups"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان گروه بندی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'code')" outlined v-model="items.code"  type="text" label="کد گروه بندی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'code')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'discount')" outlined v-model="items.discount_percent"  type="number"  label="درصد تخفیف گروه بندی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'discount')" />
            </template>
          </q-input>
        </div>


        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input
              :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="items.color_code" label="رنگ گروه بندی"
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
        <div class="col-12 q-pa-xs">
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>