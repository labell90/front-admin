<script>
import {mapActions} from "vuex";

export default {
  name: "Default_Stores_Edit",
  mounted() {
    this.Get_Item();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      items:{
        name:null,
        code:null,
        description:null,
      },
    }
  },
  methods:{
    ...mapActions([
      "Module_Default_Stores_Edit",
      "Module_Default_Stores_Show",
      "Module_Default_Stores_All"
    ]),
    Get_Item(){
      this.Module_Default_Stores_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Default_Stores_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'default_stores_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },
    Get_Units(){
      this.Module_Default_Stores_All().then(res => {
        this.units=[];
        res.data.result.forEach(item =>{
          this.units.push({label:item.name,value:item.id,symbol:item.symbol});
        })
      }).catch(error => {
        this.Methods_Notify_Error_Server();

      })
    },
    Filter_Units_Select (val, update, abort) {
      update(() => {
        if (val){
          this.units =  this.units.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Units();
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

      <q-card>
        <q-card-section>
          <global_actions_header_buttons :create="true" :index="true"  route="default_stores"></global_actions_header_buttons>
          <q-separator class="q-mt-xl"/>
          <strong class="text-grey-10">ویرایش انبار پیش فرض : <span class="text-red-8">{{ items.name }}</span></strong>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام ویژگی  ">
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                </template>
              </q-input>
            </div>



            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
              <q-input  :error="this.Methods_Validation_Check(errors,'code')" outlined v-model="items.code"  type="text" label="کد انبار پیش فرض">
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