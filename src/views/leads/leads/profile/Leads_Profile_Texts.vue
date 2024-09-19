<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Texts",
  props:['lead'],
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
      add_items: {
        text: null
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
        <strong class="text-teal-8 font-16">پیامک های ارسال شده</strong>
        <q-btn @click="dialog_add=true" class="float-right" color="pink-7"  glossy icon="fas fa-notes-medical" label="ارسال پیامک جدید"></q-btn>
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
              <strong class="text-grey-9 font-16">ارسال پیامک جدید برای  : <strong class="text-red">{{lead.name}}</strong></strong>
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
                  <q-input disable outlined  type="text" :model-value="lead.phone" label="ارسال به شماره موبایل" >
                  </q-input>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                  <q-input  :error="this.Methods_Validation_Check(errors,'text')" outlined  type="textarea" v-model="add_items.text" label="توضیحات" rows="4">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'text')" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn glossy color="pink-7" label="ارسال پیامک "  @click="Item_Create" :loading="loading_add" />
              <q-btn glossy color="dark" label="بستن" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <q-separator class="q-mt-md"/>
      <div class="q-mt-md">
        <strong class="text-teal-8">جستجو و فیلتر پیشترفته</strong>
        <div class="q-mt-sm">
          <global_searching_full_search @Search="(data) => Items_Search(data)" v-if="searchable.length" :items="searchable" ></global_searching_full_search>
        </div>
      </div>
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
        <template v-slot:body-cell-is_success="props">
          <q-td :props="props" >
            <q-btn v-if="props.row.is_success" color="green-7" glossy icon="fas fa-check" title="ارسال شده" round size="xs"></q-btn>
            <q-btn v-else color="red-7" glossy icon="fas fa-times" title="ارسال شده" round size="xs"></q-btn>
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

      </q-table>



    </q-card-section>
  </q-card>


</template>


<style scoped>

</style>