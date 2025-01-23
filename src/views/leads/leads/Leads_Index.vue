<script>
import {mapActions} from "vuex";
import Leads_Multi_Edit from "@/views/leads/leads/Leads_Multi_Edit.vue";
import { useQuasar} from 'quasar'
import Leads_Settings_Merge from "@/views/leads/leads/settings/Leads_Settings_Merge.vue";
import Editor from "@tinymce/tinymce-vue";


export default {
  name: "Leads_Index",
  components:{
    Editor,
    'lead_multi_edit' : Leads_Multi_Edit,
    'leads_settings_merge' : Leads_Settings_Merge,
  },

  created() {
    this.editor_api =  import.meta.env.VITE_API_TINY_MCE
  },

  mounted() {
    this.Items_Get();
    this.Searchable_Get();
    this.Columns_Generate();

  },

  data(){
    return {
      $q: useQuasar(),
      items:[],
      searchable:[],
      query_params:{
        sort_by : 'id',
        sort_type : 'desc',
        search :{}
      },
      items_loading:true,
      delete_loading:false,
      activation_loading:false,
      actions_loading:false,
      convert_loading:false,
      multi_edit_dialog:false,
      multi_sms_dialog:false,
      multi_email_dialog:false,
      multi_note_dialog:false,
      setting_dialog:false,
      active_setting : null,
      data_sms : {
        text : null,
      },
      multi_sms_loading : false,
      data_email : {
        subject : null,
        content : null
      },
      data_note : {
        note : null,
        file : null
      },
      multi_email_loading : false,
      multi_note_loading : false,
      convert_dialog:[],
      items_selected:[],
      selected: [],
      editor_api:null,

      pagination: {
        sortBy : 'id',
        descending:true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      },
      columns : [-
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true,
          field: row =>row.id,
        },
        {
          name: 'name',
          value: 'name',
          label: 'نام',
          align: 'left',
          format: val => `${val}`,
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'phone',
          value: 'phone',
          label: 'شماره موبایل',
          align: 'left',
          sortable: false,
          field: row => row.phone,
        },
        {
          name: 'company',
          value: 'company',
          label: 'نام شرکت',
          align: 'left',
          sortable: true,
          field: row => row.company,
        },
        {
          name: 'code',
          value: 'code',
          label: 'کد',
          align: 'left',
          sortable: true,
          field: row => row.code,
        },
        {
          name: 'is_active',
          value: 'is_active',
          label: 'وضعیت',
          align: 'left',
          sortable: true,
          field: row => row.is_active,
        },
        {
          name: 'created_by',
          value: 'created_by',
          label: 'ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_by,
        },
        {
          name: 'created_at',
          value: 'created_at',
          label: 'ت ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_at,
        },
        {
          name: 'updated_by',
          value: 'updated_by',
          label: 'ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_by,
        },
        {
          name: 'updated_at',
          value: 'updated_at',
          label: 'ت ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_at,
        },
        {
          name: 'tools',
          value: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ],
      visible_columns:[],

    }
  },

  methods :{
    ...mapActions([
        "Module_Lead_Action_Index",
        "Module_Lead_Action_Delete",
        "Module_Lead_Action_Actions_Delete",
        "Module_Lead_Action_Actions_Text",
        "Module_Lead_Action_Actions_Email",
        "Module_Lead_Action_Actions_Note",
        "Module_Lead_Action_Activation",
        "Module_Lead_Action_Searchable",
        "Module_Lead_Action_Convert_Client",
        "Module_Lead_Action_Convert_Customer"
    ]),

    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
        this.items = res.data.result.data;
        this.pagination.page = res.data.result.current_page;
        this.pagination.rowsPerPage = res.data.result.per_page;
        this.pagination.rowsNumber = res.data.result.total;
        this.items_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })
    },

    Searchable_Get(){
      this.Module_Lead_Action_Searchable().then(res => {
        this.searchable = res.data.result
        console.log(this.searchable)
      })
    },

    Item_Delete(id){
      this.delete_loading=true;
      this.Module_Lead_Action_Delete(id).then(res => {
        this.items = this.items.filter(item => {
          return item.id !== id;
        })
        this.Methods_Notify_Delete();
        this.delete_loading=false;
      }).catch(error => {
        if (error.response.status === 409) {
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.delete_loading=false;

      })

    },

    Convert_Client(id) {
      this.$q.dialog({
        title: 'آیا اطمینان دارید',
        message: 'این سرنخ به نماینده تبدیل شود ؟',
        ok: {
          glossy: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.convert_loading=true;
        this.Module_Lead_Action_Convert_Client(id).then(res => {
          this.Methods_Notify_Message_Success("سرنخ باموفقیت به نماینده تبدیل شد")
          this.convert_loading=false;
        }).catch(error => {
          if (error.response.status === 409) {
            this.Methods_Notify_Message_Error(error.response.data.error)
          }
          this.convert_loading=false;

        })
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    },

    Convert_Customer(id) {
      this.$q.dialog({
        title: 'آیا اطمینان دارید',
        message: 'این سرنخ به مشتری تبدیل شود ؟',
        ok: {
          glossy: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.convert_loading=true;
        this.Module_Lead_Action_Convert_Customer(id).then(res => {
          this.Methods_Notify_Message_Success("سرنخ باموفقیت به مشتری تبدیل شد")
          this.convert_loading=false;
        }).catch(error => {
          if (error.response.status === 409) {
            this.Methods_Notify_Message_Error(error.response.data.error)
          }
          this.convert_loading=false;

        })
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    },

    Item_Actions_Delete(){
      this.actions_loading=true;
      this.Module_Lead_Action_Actions_Delete({ids : this.items_selected}).then(res => {
        this.items = this.items.filter(item => {
          return !this.items_selected.includes(item.id);
        })
        this.Methods_Notify_Delete();
        this.actions_loading=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Notify_Error_Internal();
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.actions_loading=false;
      })

    },

    Item_Actions_Edit(){
      this.multi_edit_dialog=false;
      this.Methods_Notify_Update();
      this.Items_Get(this.pagination.rowsPerPage,this.pagination.page)
    },

    Item_Actions_Text(){
      this.multi_sms_loading = true;
      let data = {
        ids : this.items_selected,
        text : this.data_sms.text
      }
      this.Module_Lead_Action_Actions_Text(data).then(res => {
        this.Methods_Notify_Message_Success('پیامک ها باموفقیت ارسال شد');
        this.multi_sms_loading=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.multi_sms_loading=false;
      })


    },

    Item_Actions_Email(){
      this.multi_email_loading = true;
      let data = {
        ids : this.items_selected,
        subject : this.data_email.subject,
        content : this.data_email.content
      }
      this.Module_Lead_Action_Actions_Email(data).then(res => {
        this.Methods_Notify_Message_Success('ایمیل ها باموفقیت ارسال شد');
        this.multi_email_loading=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.multi_email_loading=false;
      })

    },

    Item_Actions_Note(){
      this.multi_note_loading = true;
      let data = {
        ids : this.items_selected,
        note : this.data_note.note,
        file : this.data_note.file
      }
      this.Module_Lead_Action_Actions_Note(data).then(res => {


        this.Methods_Notify_Message_Success('یادداشت باموفقیت ثبت شد');
        this.multi_note_loading=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.multi_note_loading=false;
      })

    },

    Item_Activation(id){
      this.activation_loading=true;
      this.Module_Lead_Action_Activation(id).then(res => {
        this.items = this.items.filter(item => {
          if (item.id === id){
            item.is_active = !item.is_active;
          }
          return item;
        })
        this.activation_loading=false;
      }).catch(error =>{
        if (error.response.status === 409) {
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
        }
        this.activation_loading=false;
      })

    },

    Merge_Leads(){
      this.active_setting=null;
      this.Methods_Notify_Message_Success("سرنخ های مورد نظر باموفقیت ادغام شدند !")
    },

    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },

    Items_OnRequest(props){
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      let sort_type;
      this.pagination.sortBy = sortBy
      if (page === this.pagination.page && rowsPerPage === this.pagination.rowsPerPage){
        this.pagination.descending = !this.pagination.descending
      }
      if (this.pagination.descending){
        sort_type = "desc"
      }else {
        sort_type = "asc"
      }
      this.query_params.sort_by = sortBy;
      this.query_params.sort_type = sort_type;
      this.Items_Get(rowsPerPage,page);

    },

    Items_Search(data){
      this.query_params.search = data;
      this.Items_Get()
    },

    Columns_Generate(){
      this.columns.forEach(item => {
        if (item.value){
          this.visible_columns.push(item.value)
        }
      })
    }

  }
}
</script>

<template>

  <q-card>

    <q-card-section>

      <global_actions_header_buttons :create="true" :archive="true" route="lead"></global_actions_header_buttons>

      <q-btn @click="setting_dialog=true" class="float-right q-mr-sm" color="green-8"  glossy icon="fas fa-screwdriver-wrench" size="11px" round>
        <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
          تنظیمات سرنخ ها
        </q-tooltip>
      </q-btn>
      <q-dialog
          v-model="setting_dialog"
          position="top"
      >
        <q-card style="width: 960px; max-width: 80vw;">
          <q-card-section>
            <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
            <strong class="font-15"> تنظیمات سرنخ ها</strong>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-btn @click="active_setting = 'merge'" :color="active_setting === 'merge' ? 'deep-orange-7' : 'blue-grey-7'"   glossy label="ادغام سرنخ ها" icon="mdi-set-merge mdi-48px q-mr-md" class="font-14"></q-btn>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <template v-if="active_setting">

              <leads_settings_merge @Merge_Leads="Merge_Leads" v-if="active_setting === 'merge'" class="animation-fade-in"></leads_settings_merge>

            </template>
            <template v-else>
              <div class="text-center q-mt-md q-mb-md">
                <q-icon name="fas fa-hand-pointer font-34 text-teal-8 fa-beat"></q-icon>
                <strong class="q-ml-sm text-grey-9">لطفا یکی از گزینه ها را انتخاب کنید</strong>
              </div>
            </template>

          </q-card-section>
        </q-card>
      </q-dialog>

      <q-separator class="q-mt-xl"/>
      <div class="q-mt-md">
        <strong class="text-teal-8">جستجو و فیلتر پیشترفته</strong>
        <div class="q-mt-sm">
          <global_searching_full_search @Search="(data) => Items_Search(data)" v-if="searchable.length" :items="searchable" ></global_searching_full_search>
        </div>
      </div>

    </q-card-section>
    <q-card-section>
      <div class="q-mb-sm">
        <q-select
            outlined
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="visible_columns"
            label="موارد قابل مشاهده"
            :options="columns"
            emit-value
            map-options
            multiple
            behavior="dialog"
            use-chips
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>

        </q-select>
      </div>
      <q-table
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title="لیست آیتم ها"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          :visible-columns="visible_columns"
          separator="cell"
          selection="multiple"
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
          v-model:pagination="pagination"
          @request="Items_OnRequest"
          binary-state-sort

      >
        <template v-slot:top="props">

          <q-btn
              flat dense
              :icon="props.inFullscreen ? 'fas fa-minimize text-pink-7' : 'fas fa-maximize text-pink-7'"
              @click="props.toggleFullscreen"
              class="font-12 "
          />

          <global_actions_multi_actions @Note_Ok="multi_note_dialog=true" @Email_Ok="multi_email_dialog=true" @SMS_Ok="multi_sms_dialog=true" @Edit_Ok="multi_edit_dialog=true" @Delete_Ok="Item_Actions_Delete" :action_loading="actions_loading" :items="items_selected" class="animation-fade-in" v-if="items_selected.length > 0" ></global_actions_multi_actions>

          <q-dialog
              v-model="multi_edit_dialog"
              full-width
              transition-show="slide-up"
              transition-hide="slide-down"
          >
            <q-card>
              <q-card-section>
                <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
                <strong class="font-15">ویرایش گروهی سرنخ ها </strong>
              </q-card-section>
              <q-separator/>

              <lead_multi_edit @Updated="Item_Actions_Edit" :ids="items_selected" ></lead_multi_edit>

            </q-card>
          </q-dialog>

          <q-dialog
              v-model="multi_email_dialog"
              full-width
              transition-show="slide-up"
              transition-hide="slide-down"
              position="top"
          >
            <q-card>
              <q-card-section>
                <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
                <strong class="font-15">ارسال ایمیل گروهی به سرنخ ها </strong>
              </q-card-section>
              <q-separator/>
              <q-card-section>
                <div class="q-mt-sm">
                  <q-input  :error="this.Methods_Validation_Check(errors,'subject')" outlined  type="text" v-model="data_email.subject" label="موضوع ( Subject )">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'subject')" />
                    </template>
                  </q-input>
                </div>
                <div class="q-mt-md">
                  <Editor
                      v-model="data_email.content"
                      :api-key="editor_api"

                      :init="{
                            language:'fa',
                            language_url : '/src/assets/helpers/tinymce/langs/fa.js',
                            toolbar_mode: 'sliding',
                            plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                          }"
                  />
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn @click="Item_Actions_Email" :loading="multi_email_loading" glossy color="pink-7" label="ارسال ایمیل "   />
                <q-btn v-close-popup glossy color="dark" label="بستن"  />
              </q-card-actions>


            </q-card>
          </q-dialog>

          <q-dialog
              v-model="multi_sms_dialog"
              position="top"
          >
            <q-card style="width: 700px; max-width: 80vw;">
              <q-card-section>
                <strong class="text-grey-9 font-16">ارسال پیامک گروهی </strong>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section>
                <q-banner class="bg-yellow-9 text-dark rounded-borders">
                  <strong class="font-16">
                    <q-icon name="fas fa-triangle-exclamation fa-beat" size="24px"></q-icon>
                    توجه :
                  </strong>
                  <strong>
                    متصل بودن VPN میتواند در روند ارسال پیامک اختلال ایجاد کند !
                  </strong>
                </q-banner>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                    <q-input v-model="data_sms.text" :error="this.Methods_Validation_Check(errors,'text')" outlined  type="textarea" label="متن پیامک" rows="4">
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'text')" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn @click="Item_Actions_Text" :loading="multi_sms_loading" glossy color="pink-7" label="ارسال پیامک گروهی "  />
                <q-btn glossy color="dark" label="بستن" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog
              v-model="multi_note_dialog"
              position="top"
          >
            <q-card style="width: 700px; max-width: 80vw;">
              <q-card-section>
                <strong class="text-grey-9 font-16">ثبت گروهی یادداشت </strong>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                    <q-input  :error="this.Methods_Validation_Check(errors,'note')" outlined  type="textarea" v-model="data_note.note" label="متن یادداشت">
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'note')" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                    <q-file :error="this.Methods_Validation_Check(errors,'file')" clearable counter outlined v-model="data_note.file" label="انتخاب فایل پیوست">
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
                <q-btn @click="Item_Actions_Note" :loading="multi_note_loading" glossy color="pink-7" label="ثبت یادداشت گروهی "  />
                <q-btn glossy color="dark" label="بستن" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>




        </template>
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <router-link :to=" {name:'lead_profile',params:{id:props.row.id}}" >
              <div class="q-ml-sm q-mt-sm"><strong class="text-indigo-7">{{ props.row.name }}</strong></div>
            </router-link>
          </q-td>
        </template>

        <template v-slot:body-cell-color_code="props">
          <q-td :props="props" :style="'background-color:'+props.row.color_code ">

          </q-td>
        </template>

        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
            <global_actions_activation_item @Set_Ok="Item_Activation(props.row.id)" :status="props.row.is_active"></global_actions_activation_item>
          </q-td>
        </template>

        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn :to="{name:'lead_edit',params:{id:props.row.id}}" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <q-btn :to="{name:'lead_profile',params:{id:props.row.id}}" glossy class="q-ma-xs" color="green-8" icon="fas fa-user" size="9px" round title="مشاهده پروفایل"/>
              <q-btn @click="convert_dialog[props.row.id] = true" glossy class="q-ma-xs" color="purple-9" icon="fas fa-rotate" size="9px" round title="تبدیل سرنخ"/>
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
            </div>
          </q-td>
          <q-dialog
              v-model="convert_dialog[props.row.id]"
              position="top"
          >
            <q-card style="width: 960px; max-width: 80vw;">
              <q-card-section>
                <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
                <strong class="font-15">تبدیل سرنخ : <strong class="text-red">{{props.row.name}}</strong> </strong>
              </q-card-section>
              <q-separator/>
              <q-card-section>
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 q-pa-sm">
                    <div class="q-pa-xs rounded-borders glossy-bg row cursor-pointer" @click="Convert_Client(props.row.id)">
                      <div class="col-lx-4 col-lg-5 col-md-6">
                        <img src="assets/images/icons/client-convert.png" width="65" alt="">
                      </div>
                      <div class="col-lx-8 col-lg-7 col-md-6">
                        <div class="q-mt-lg">
                          <strong class="">تبدیل به نماینده </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 q-pa-sm">
                    <div class="q-pa-xs rounded-borders glossy-bg row cursor-pointer" @click="Convert_Customer(props.row.id)">
                      <div class="col-lx-4 col-lg-5 col-md-6">
                        <img src="assets/images/icons/customer-convert.png" width="65" alt="">
                      </div>
                      <div class="col-lx-8 col-lg-7 col-md-6">
                        <div class="q-mt-lg">
                          <strong class="">تبدیل به مشتری </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

        </template>

        <template v-slot:body-cell-created_by="props">
          <q-td :props="props" >
            <global_items_user :user="props.row.created_by" />
          </q-td>
        </template>
        <template v-slot:body-cell-created_at="props">
          <q-td :props="props" >
            <global_filter_date :date="props.row.created_at" />
          </q-td>
        </template>
        <template v-slot:body-cell-updated_by="props">
          <q-td :props="props" >
            <global_items_user :user="props.row.updated_by" />
          </q-td>
        </template>
        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props" >

            <global_filter_date :date="props.row.updated_at" />

          </q-td>
        </template>
      </q-table>
    </q-card-section>

  </q-card>

</template>

<style scoped>

.glossy-bg{
  background-color: rgba(11,10,10,0.14) !important;
}
.glossy-bg:hover{
  background-color: rgba(11,10,10,0.24) !important;
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px rgba(0,0,0,.14),0 1px 18px rgba(0,0,0,.12)
}
.tox .tox-silver-sink .tox-tinymce-aux{
  z-index: 999999!important;
}

</style>