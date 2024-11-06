<script>
import Editor from '@tinymce/tinymce-vue'
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Emails",
  components:{
    'Editor' : Editor,
  },
  props:['lead'],
  created() {
    this.editor_api =  import.meta.env.VITE_API_TINY_MCE

  },
  mounted() {

    this.query_params.lead_id = this.lead.id;
    this.Items_Get();

  },
  data() {
    return {
      dialog_add: false,
      loading_add: false,
      items_loading: true,
      dialog_show:[],
      editor_api:null,
      add_items: {
        subject: null,
        content:null,
      },
      items: [],
      total_items: 0,
      page: 1,
      query_params: {
        lead_id: null,
        sort_by: 'id',
        sort_type: 'desc',
        search: {}
      },
      errors: [],
      items_selected:[],
      selected: [],
      pagination: {
        sortBy : 'id',
        descending:true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      },
      searchable:[],

      columns : [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true,
          field: row => '# ' + row.id,
        },
        {
          name: 'subject',
          value: 'subject',
          label: 'موضوع',
          align: 'left',
          sortable: false,
          field: row => row.subject,
        },
        {
          name: 'from',
          value: 'from',
          label: 'از آدرس',
          align: 'left',
          sortable: false,
          field: row => row.from,
        },
        {
          name: 'is_success',
          value: 'is_success',
          label: 'وضعیت ارسال',
          align: 'left',
          sortable: true,
          field: row => row.is_success,
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
          name: 'tools',
          value: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ],

    }
  },
  methods:{
    ...mapActions([
      "Module_Lead_Email_Action_Index",
      "Module_Lead_Email_Action_Create",
    ]),

    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Email_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
        this.items = res.data.result.data;
        this.pagination.page = res.data.result.current_page;
        this.pagination.rowsPerPage = res.data.result.per_page;
        this.pagination.rowsNumber = res.data.result.total;
        this.total_items = res.data.result.total;
        this.items_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })
    },
    Item_Create(){
      this.loading_add=true;
      let data = {
        subject : this.add_items.subject,
        content : this.add_items.content,
        lead_id : this.lead.id
      }
      this.Module_Lead_Email_Action_Create(data).then(res => {
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
  <q-card bordered class="shadow-10">
    <q-card-section>
      <div>

        <strong class="text-teal-8 font-16">ایمیل های ارسال شده</strong>
        <q-btn @click="dialog_add= !dialog_add" class="float-right" color="pink-7"  glossy icon="fas fa-notes-medical" label="ارسال ایمیل جدید"></q-btn>

        <div class="q-mt-xs">
          <strong class="text-red font-15">{{total_items}}</strong>
          <span class="q-ml-sm text-grey-7">ثبت شده</span>
        </div>
        <div v-if="dialog_add" class="q-mt-md q-mb-lg animation-fade-in">
          <q-card>
            <q-card-section>
              <strong class="text-grey-9 font-16">ارسال ایمیل جدید برای  : <strong class="text-red">{{lead.name}}</strong></strong>
            </q-card-section>
            <q-separator></q-separator>
            <global_images_animation_info v-if="!lead.email" :text="'ایمیلی برای این سرنخ ثبت نشده است ، برای ارسال ایمیل ابتدا از قسمت ویرایش اطلاعات برای سرنخ ایمیل ثیت کنید'"></global_images_animation_info>

            <template v-else>
              <q-card-section>
                <div class="q-mt-sm">
                  <q-input disable outlined  type="text" :model-value="lead.email" label="ارسال به آدرس : ">
                  </q-input>
                </div>
                <div class="q-mt-sm">
                  <q-input  :error="this.Methods_Validation_Check(errors,'subject')" outlined  type="text" v-model="add_items.subject" label="موضوع ( Subject )">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'subject')" />
                    </template>
                  </q-input>
                </div>
                <div class="q-mt-md">
                  <Editor
                      v-model="add_items.content"
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
                <q-btn glossy color="pink-7" label="ارسال ایمیل به سرنخ "  @click="Item_Create" :loading="loading_add" />
                <q-btn glossy color="dark" label="بستن" @click="dialog_add=false" />
              </q-card-actions>
            </template>

          </q-card>
        </div>

      </div>
      <q-separator class="q-mt-md"/>
      <q-table
          class="q-mt-lg"
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          separator="cell"
          selection="multiple"
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
          v-model:pagination="pagination"
          @request="Items_OnRequest"
      >

        <template v-slot:body-cell-subject="props">
          <q-td :props="props" >
            <span class="cursor-pointer">
                          {{this.Methods_Text_Shorter(props.row.subject,30)}}
              <q-tooltip transition-show="scale" transition-hide="scale" class="bg-primary font-12">
                {{props.row.subject}}
              </q-tooltip>
            </span>
          </q-td>
        </template>

        <template v-slot:body-cell-is_success="props">
          <q-td :props="props" >
            <q-btn v-if="props.row.is_success" color="green-7" glossy icon="fas fa-check" title="ارسال شده" round size="xs"></q-btn>
            <q-btn v-else color="red-7" glossy icon="fas fa-times" title="ارسال نشده" round size="xs"></q-btn>
          </q-td>
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

        <template v-slot:body-cell-tools="props">
          <q-td :props="props" >
            <q-btn @click="dialog_show[props.row.id] = true" color="primary" icon="fas fa-eye" label="مشاهده ایمیل" size="sm" class="font-11" rounded glossy></q-btn>
          </q-td>
          <q-dialog
              v-model="dialog_show[props.row.id]"
              position="top"
              full-width
          >
            <q-card style="width: 700px; max-width: 80vw;">
              <q-card-section>
                <strong class="text-red font-15">موضوع : </strong>
                <strong class="text-grey-9 font-15">
                  {{ props.row.subject }}
                </strong>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-section>
                <span v-html="props.row.content"></span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn glossy color="dark" label="بستن" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>




        </template>

      </q-table>




    </q-card-section>
  </q-card>

</template>


<style scoped>

</style>