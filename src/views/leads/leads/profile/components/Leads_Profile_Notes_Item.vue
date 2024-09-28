<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Notes_Item",
  props:['lead','item'],
  data(){
    return{
      dialog_edit : false,
      dialog_reply : false,
      loading_edit : false,
      loading_reply : false,
      reply_items : {
        note : null,
        file : null,
      },
      edit_file:null,
      errors:[],

    }
  },
  methods :{
    ...mapActions([
        "Module_Lead_Note_Action_Delete",
        "Module_Lead_Note_Action_Edit",
        "Module_Lead_Note_Action_Create",
    ]),
    Item_Delete(item){
      this.loading_delete = true;
      let data = {
        id : item.id,
        lead_id : this.lead.id
      }
      this.Module_Lead_Note_Action_Delete(data).then(res => {
        this.loading_delete = false;
        this.$emit('Delete_Item',item)
        this.Methods_Notify_Delete();
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.loading_delete=false;
      })

    },
    Item_Edit(item){
      this.loading_edit = true;
      let data = {
        note : item.note,
        id : item.id,
        lead_id : this.lead.id,
        file : this.edit_file
      }
      this.Module_Lead_Note_Action_Edit(data).then(res => {
        this.loading_edit = false;
        this.dialog_edit= false;
        this.Methods_Notify_Update();
        if (this.edit_file){
          this.edit_file=null;
          location.reload();
        }
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_file=null
        this.loading_edit=false;
      })

    },
    Item_Reply(){
      this.loading_reply=true;
      let data = {
        note : this.reply_items.note,
        reply_id : this.item.id,
        file : this.reply_items.file,
        lead_id : this.lead.id
      }
      this.Module_Lead_Note_Action_Create(data).then(res => {
        this.loading_reply = false;
        this.reply_items = {
          note : null,
          file : null,
        }
        this.dialog_reply=false;
        this.Methods_Notify_Create();
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading_reply=false;
      })

    },



  }

}
</script>

<template>
  <q-chat-message
      bg-color="grey-3"
  >
    <template  v-slot:name>
      <strong class="text-red">
        {{item.created_by.name}}
      </strong>
    </template>
    <template v-slot:avatar>
      <img class="q-message-avatar q-message-avatar--received" src="assets/images/icons/user.png" alt="avatar" />
    </template>
    <div class="q-px-xs q-pa-sm" style="line-height: 25px">
      {{item.note}}
      <template v-if="item.file_url">
        <div class="q-mt-sm">
          <global_items_file_view_by_type :file="item" ></global_items_file_view_by_type>
        </div>
      </template>

    </div>
    <template v-slot:stamp >

      <div class="text-right q-mt-sm">
                  <span class="float-left">
                    <global_filter_date :date="item.updated_at"></global_filter_date>
                  </span>
        <q-btn @click="dialog_edit = true" glossy title="ویرایش" color="blue-8" icon="fas fa-pen" size="9px" round />
        <global_actions_delete_item @Set_Ok="Item_Delete(item)"></global_actions_delete_item>
        <q-btn @click="dialog_reply = true" glossy title="پاسخ به این یادداشت" color="green-8" icon="fas fa-reply" size="9px" round />

        <template v-if="item.replies.length > 0">
          <div v-for="reply in item.replies">
            <q-separator class=" q-mb-sm q-mt-md"/>
            <global_leads_note_item :lead="lead" :item="reply"></global_leads_note_item>

          </div>
        </template>


      </div>

    </template>

  </q-chat-message>

  <q-dialog
      v-model="dialog_edit"
      position="top"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <strong class="text-grey-9 font-16">ویرایش یادداشت</strong>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
            <q-input  :error="this.Methods_Validation_Check(errors,'note')" outlined  type="textarea" v-model="item.note" label="متن یادداشت">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'note')" />
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
            <q-file :error="this.Methods_Validation_Check(errors,'file')" clearable counter outlined v-model="edit_file" label="انتخاب فایل پیوست">
              <template v-slot:prepend>
                <q-icon name="fas fa-file" />
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'file')" />
              </template>
            </q-file>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn glossy color="blue-7" label="ویرایش یادداشت"  @click="Item_Edit(item)" :loading="loading_edit" />
        <q-btn glossy color="dark" label="بستن" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
      v-model="dialog_reply"
      position="standard"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <strong class="text-green-8 font-15"> پاسخ به یادداشت : </strong>
        <span class="font-14 text-grey-9">{{this.Methods_Text_Shorter(item.note,40)}}</span>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
            <q-input  :error="this.Methods_Validation_Check(errors,'note')" outlined  type="textarea" v-model="reply_items.note" label="متن یادداشت" rows="3">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'note')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
            <q-file :error="this.Methods_Validation_Check(errors,'file')" clearable counter outlined v-model="reply_items.file" label="انتخاب فایل پیوست">
              <template v-slot:prepend>
                <q-icon name="fas fa-file" />
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'file')" />
              </template>
            </q-file>
          </div>
        </div>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn glossy color="green-7" label="ارسال پاسخ"  @click="Item_Reply" :loading="loading_reply" />
        <q-btn glossy color="dark" label="بستن" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>


</template>

<style scoped>

</style>