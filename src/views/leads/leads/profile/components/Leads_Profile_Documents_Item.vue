<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Documents_Item",
  props:['lead','document'],
  mounted() {
    this.edit_items.title = this.document.title;
    this.edit_items.description = this.document.description;
  },
  data(){
    return{
      dialog_edit:false,
      loading_edit:false,
      loading_delete:false,
      edit_items : {
        title : null,
        document : null,
        description : null
      },
      errors : [],
    }
  },
  methods : {
    ...mapActions([
        "Module_Lead_Document_Action_Edit",
        "Module_Lead_Document_Action_Delete",
    ]),
    DownloadFile(){

      axios.get("users/leads/leads/"+this.lead.id+"/documents/download/"+this.document.id,{responseType: 'blob'}).then(res => {
        // ایجاد لینک دانلود برای کاربر
        const blob = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', this.document.file_name); // نام فایل که دانلود می‌شود
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })


    },
    Edit_Item(){
      this.loading_edit=true;
      let data = {
        id : this.document.id,
        title : this.edit_items.title,
        document : this.edit_items.document,
        description : this.edit_items.description,
        lead_id : this.lead.id
      }
      this.Module_Lead_Document_Action_Edit(data).then(res => {
        this.$emit ("Updated")
        this.Methods_Notify_Update();
        this.loading_edit=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_items=false;
      })


    },
    Delete_Item() {
      this.loading_delete = true;
      this.Module_Lead_Document_Action_Delete({lead_id : this.lead.id,id : this.document.id}).then(res => {
        this.loading_delete=false;
        this.$emit("Deleted")
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

  <q-card class="bg-grey-4 shadow-8">
    <q-card-section>
      <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <div class="q-mb-sm">
            <strong class="text-grey-8">عنوان سند : </strong>
            <strong class="text-red">{{document.title}} </strong>
          </div>
          <div class="q-mb-sm">
            <strong class="text-grey-8">توسط : </strong>
            <strong class="text-red"><global_items_user :user="document.created_by"></global_items_user> </strong>
          </div>
          <div class="q-mb-md">
            <strong class="text-grey-8">تاریخ : </strong>
            <strong class="text-red"><global_filter_date :date="document.updated_at"></global_filter_date> </strong>
          </div>
          <div class="q-mb-sm">
            <strong class="text-grey-8">توضیحات : </strong>
            <strong class="text-red">{{document.description}}</strong>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <div class="text-right q-mb-sm">
            <q-btn @click="DownloadFile" glossy title="دریافت فایل سند" class="q-ml-xs" color="green-8" icon="fas fa-download" size="9px" round  />
            <q-btn @click="dialog_edit=true" glossy title="ویرایش آیتم" class="q-ml-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
            <global_actions_delete_item @Set_Ok="Delete_Item"  :loading="loading_delete" ></global_actions_delete_item>
          </div>
          <div class="text-right q-mb-sm" dir="ltr">
            <strong class="text-grey-7">File name : </strong>
            <strong class="text-indigo">{{document.file_name}}</strong>
          </div>
          <div class="text-right q-mb-sm" dir="ltr">
            <strong class="text-grey-7">File size : </strong>
            <strong class="text-dark">{{this.$filters.file_size(document.file_size)}}</strong>
          </div>
          <div class="text-right q-mb-sm" dir="ltr">
            <strong class="text-grey-7">File type : </strong>
            <strong class="text-indigo"><global_filter_file_type :file="document.file_type"></global_filter_file_type></strong>
          </div>
        </div>
      </div>
      <q-dialog
          v-model="dialog_edit"
          position="top"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <strong class="text-grey-9 font-16">ویرایش اطلاعات سند</strong>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input  :error="this.Methods_Validation_Check(errors,'title')" outlined  type="text" v-model="edit_items.title" label="عنوان سند">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'title')" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-banner class="bg-yellow-9 q-mb-sm rounded-borders">
                  <q-icon name="fas fa-triangle-exclamation" size="30px"></q-icon>
                  <strong class="q-ml-sm">
                    فقط در صورت ویرایش فایل فعلی ، فایل جدید را انتخاب کنید
                  </strong>
                </q-banner>
                <q-file :error="this.Methods_Validation_Check(errors,'document')" clearable counter outlined v-model="edit_items.document" label="انتخاب فایل سند">
                  <template v-slot:prepend>
                    <q-icon name="fas fa-file" />
                  </template>
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'document')" />
                  </template>
                </q-file>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined  type="textarea" v-model="edit_items.description" label="توضیحات" rows="4">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn glossy color="blue-7" label="ویرایش سند" @click="Edit_Item"  :loading="loading_edit" />
            <q-btn glossy color="dark" label="بستن" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>