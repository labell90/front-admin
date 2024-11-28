<script>
import {mapActions} from "vuex";

export default {
  name: "Client_Groups_Edit",
  mounted() {
    this.Get_Item();
  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items: null


    }
  },
  methods:{
    ...mapActions([
      "Module_Client_Groups_Edit",
      "Module_Client_Groups_Show"
    ]),
    Get_Item(){
      this.Module_Client_Groups_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
        console.log(this.items)
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Client_Groups_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
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
    <q-card-section v-if="loading">
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <template v-else>
      <q-card>
        <q-card-section>
          <strong class="text-grey-10">ویرایش گروه بندی : <span class="text-red-8">{{ items.name }}</span></strong>
          <global_actions_header_buttons :create="true" route="client_groups"></global_actions_header_buttons>
          <q-separator class="q-mt-xl"/>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان گروه بندی  ">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'code')" outlined v-model="items.code"  type="text" label="کد گروه بندی  ">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'code')" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'discount_percent')" outlined v-model="items.discount_percent"  type="number" label="درصد تخفیف گروه بندی">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'discount_percent')" />
                </template>
              </q-input>
            </div>
            `
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