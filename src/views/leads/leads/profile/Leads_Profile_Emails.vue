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
    this.Searchable_Get()
  },
  data() {
    return {
      dialog_add: false,
      loading_add: false,
      items_loading: true,
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
          name: 'text',
          value: 'text',
          label: 'پیامک',
          align: 'left',
          sortable: true,
          field: row => row.text,
        },
        {
          name: 'is_success',
          value: 'is_success',
          label: 'وضعیت ارسال',
          align: 'left',
          sortable: false,
          field: row => row.is_success,
        },
        {
          name: 'ip',
          value: 'ip',
          label: 'IP Address',
          align: 'left',
          sortable: false,
          field: row => row.ip,
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
      ],

    }
  },
  methods:{
    ...mapActions([
      "Module_Lead_Text_Action_Index",
      "Module_Lead_Text_Action_Create",
      "Module_Lead_Text_Action_Searchable"
    ]),

    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Text_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
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
        text : this.add_items.text,
        lead_id : this.lead.id
      }
      this.Module_Lead_Text_Action_Create(data).then(res => {
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
    Searchable_Get(){
      this.Module_Lead_Text_Action_Searchable().then(res => {
        this.searchable = res.data.result
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

    </q-card-section>
  </q-card>

</template>


<style scoped>

</style>