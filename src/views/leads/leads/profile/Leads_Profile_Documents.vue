<script>
import {mapActions} from "vuex";
import Leads_Profile_Documents_Item from "@/views/leads/leads/profile/components/Leads_Profile_Documents_Item.vue";

export default {
  name: "Leads_Profile_Documents",
  components: {
    'document_item' : Leads_Profile_Documents_Item
  },
  props:['lead'],
  mounted() {
    this.query_params.lead_id = this.lead.id;
    this.Item_Get();

  },
  data(){
    return {
      dialog_add : false,
      dialog_edit :[],
      loading_add : false,
      loading_delete : false,
      loading_edit : false,
      loading_get : true,
      loading_more : false,
      add_items : {
        title : null,
        document : null,
        description : null
      },
      items:[],
      total_items:null,
      page:1,
      query_params:{
        lead_id : null,
        sort_by : 'id',
        sort_type : 'desc',
        search :{}
      },
      errors:[],

    }
  },
  methods : {
    ...mapActions([
      "Module_Lead_Document_Action_Index",
      "Module_Lead_Document_Action_Create",
      "Module_Lead_Document_Action_Edit",
      "Module_Lead_Document_Action_Delete",

    ]),
    Item_Get(page,per_page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Document_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
        this.total_items = res.data.result.total
        if (res.data.result.data.length){
          res.data.result.data.forEach(item => {
            this.items.push(item)
          })
        }
        this.loading_get = false;
        this.loading_more = false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })


    },
    Item_Get_More(){
      this.page ++;
      this.loading_more = true;
      this.Item_Get(this.page)

    },
    Item_Create(){
      this.loading_add=true;
      let data = {
        title : this.add_items.title,
        document : this.add_items.document,
        description : this.add_items.description,
        lead_id : this.lead.id
      }
      this.Module_Lead_Document_Action_Create(data).then(res => {
        this.items.unshift(res.data.result);
        this.loading_add = false;
        this.dialog_add=false;
        this.total_items ++;
        this.Methods_Notify_Create();
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }

        this.loading_add=false;
      })

    },
    Item_Edit(item){
      this.loading_edit = true;
      let data = {
        note : item.note,
        id : item.id,
        lead_id : this.lead.id
      }
      this.Module_Lead_Document_Action_Edit(data).then(res => {
        this.loading_edit = false;
        this.dialog_edit[item.id]= false;
        this.Methods_Notify_Update();
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading_edit=false;
      })

    },
    Item_Delete(item){
      this.loading_delete = true;
      let data = {
        id : item.id,
        lead_id : this.lead.id
      }
      this.Module_Lead_Document_Action_Delete(data).then(res => {
        this.items = this.items.filter(filter_item => {
          return filter_item.id !== item.id;
        })
        this.loading_delete = false;
        this.total_items --;
        this.Methods_Notify_Delete();
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.loading_delete=false;
      })

    }

  }
}
</script>

<template>
  <q-card bordered class="shadow-10">
    <q-card-section>
      <div>
        <strong class="text-teal-8 font-16">اسناد و مدارک سرنخ</strong>
        <q-btn @click="dialog_add=true" class="float-right" color="pink-7"  glossy icon="fas fa-notes-medical" label="افزودن آیتم جدید"></q-btn>
        <div class="q-mt-xs">
          <strong class="text-red font-15">{{total_items}}</strong>
          <span class="q-ml-sm text-grey-7">ثبت شده</span>
        </div>
        <q-dialog
            v-model="dialog_add"
            position="top"
        >
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <strong class="text-grey-9 font-16">افزودن سند جدید برای : <strong class="text-red">{{lead.name}}</strong></strong>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                  <q-input  :error="this.Methods_Validation_Check(errors,'title')" outlined  type="text" v-model="add_items.title" label="عنوان سند">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'title')" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                  <q-file :error="this.Methods_Validation_Check(errors,'document')" clearable counter outlined v-model="add_items.document" label="انتخاب فایل سند">
                    <template v-slot:prepend>
                      <q-icon name="fas fa-file" />
                    </template>
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'document')" />
                    </template>
                  </q-file>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                  <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined  type="textarea" v-model="add_items.description" label="توضیحات" rows="4">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn glossy color="pink-7" label="افرودن یادداشت"  @click="Item_Create" :loading="loading_add" />
              <q-btn glossy color="dark" label="بستن" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <q-separator class="q-mt-lg q-mb-sm"/>
      <global_loading_shape v-if="loading_get" />
      <template v-else>
        <global_images_animation_no_data v-if="items.length < 1"></global_images_animation_no_data>
        <template v-else>
          <div v-for="item in items">
            <document_item :lead="lead" :document="item" class="q-mb-lg"></document_item>
          </div>
          <div class="q-mt-md q-mb-lg text-center">
            <q-btn @click="Item_Get_More" glossy color="pink-5" label="مشاهده موارد بیشتر " icon="fas fa-plus" icon-right="fas fa-plus" :disable="items.length >= total_items"></q-btn>
          </div>
        </template>
      </template>




    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>