<script>
import {mapActions} from "vuex";

export default {
  name: "Personal_Tags_Edit",
  mounted() {
    this.Get_Item()
  },
  data(){
    return {
      loading:false,
      errors:[],
      items:{
        name:null,
        color_code:'#ba2d8d',
        code:null,
      }
    }
  },
  methods:{
    ...mapActions([
        "Module_personal_tags_Edit",
        "Module_personal_tags_Show"
    ]),
    Get_Item(){
      this.Module_personal_tags_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_personal_tags_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'personal_tags_index'});
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
          <strong class="text-grey-10">ویرایش تگ شخصی : <span class="text-red-8">{{ items.name }}</span></strong>
          <global_actions_header_buttons :create="true"  route="personal_tags"></global_actions_header_buttons>
          <q-separator class="q-mt-xl"/>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان تگ ">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>
            `
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input
                  :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="items.color_code" label="رنگ تگ "
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