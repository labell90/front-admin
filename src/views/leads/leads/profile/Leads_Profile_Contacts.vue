<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Contacts",
  props:['lead'],
  mounted() {
    this.query_params.lead_id = this.lead.id;
    this.Items_Get();
  },
  data() {
    return {
      dialog_add: false,
      dialog_edit: [],
      loading_add: false,
      items_loading: true,
      loading_delete : [],
      loading_edit : [],
      add_items: {
        to_id: [],
        description:null
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

      leads:[],

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
          name: 'to',
          value: 'to',
          label: 'سرنخ',
          align: 'left',
          sortable: true,
          field: row => row.to,
        },
        {
          name: 'description',
          value: 'description',
          label: 'توضیحات',
          align: 'left',
          sortable: false,
          field: row => row.description,
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
          sortable: false ,
          field: row => row,
        },
      ],

    }
  },
  methods:{
    ...mapActions([
        "Module_Lead_Contact_Action_Index",
        "Module_Lead_Contact_Action_Create",
        "Module_Lead_Contact_Action_Delete",
        "Module_Lead_Contact_Action_Edit",
        "Module_Lead_Action_All"
    ]),

    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Contact_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
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
        to_id : this.add_items.to_id,
        description : this.add_items.description,
        lead_id : this.lead.id
      }
      this.Module_Lead_Contact_Action_Create(data).then(res => {
        // this.items.unshift(res.data.result);
        console.log(res.data)

        this.loading_add = false;
        // this.dialog_add=false;
        this.Items_Get(this.pagination.rowsPerPage,this.pagination.page)
        this.dialog_add=false;
        this.add_items.to_id=[];
        this.add_items.description=null;
        this.Methods_Notify_Create();
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading_add=false;
      })

    },
    Item_Delete(id){
      this.loading_delete[id] = true;
      this.Module_Lead_Contact_Action_Delete({lead_id : this.lead.id,id : id}).then(res => {
        this.items = this.items.filter(item => {
          return item.id !== id;
        });
        this.Methods_Notify_Delete();
        this.total_items --;
      }).catch(error => {
         this.Methods_Notify_Error_Server();

      })



    },
    Item_Edit(item){
      this.loading_edit[item.id] = true;
      let data = {
        lead_id : this.lead.id,
        description : item.description,
        id : item.id
      }
      this.Module_Lead_Contact_Action_Edit(data).then(res => {
        this.Methods_Notify_Update();
      }).catch(error => {
         this.Methods_Notify_Error_Server();
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
    Columns_Generate(){
      this.columns.forEach(item => {
        if (item.value){
          this.visible_columns.push(item.value)
        }
      })
    },

    SearchingLeads (val, update, abort) {


      if (val.trim().length >= 3){
        setTimeout(() => {
          update(() => {
            this.Module_Lead_Action_All({name : val}).then(res =>{
              this.leads=[];
              res.data.result.forEach(item => {
                this.leads.push({
                  label : item.name,
                  value : item.id,
                })
              })
            }).catch(error => {

            })
          })
        }, 1000)
      }
    },

  },

}
</script>


<template>

  <q-card bordered class="shadow-10">
    <q-card-section>
      <div>
        <strong class="text-teal-8 font-16">لیست مخاطب های سرنخ</strong>
        <q-btn @click="dialog_add=true" class="float-right" color="pink-7"  glossy icon="fas fa-notes-medical" label="افزودن مخاطب جدبد"></q-btn>
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
              <strong class="text-grey-9 font-16">ثبت مخاطب جدید برای  : <strong class="text-red">{{lead.name}}</strong></strong>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">

                  <q-select
                      outlined
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="add_items.to_id"
                      label="انتخاب سرنخ"
                      :options="leads"
                      @filter="SearchingLeads"
                      hint="برای انتخاب سرنخ لطفا حداقل 3 کاراکتر از اسم را وارد کنید"
                      emit-value
                      map-options
                      use-input
                      multiple
                      use-chips
                      :error="this.Methods_Validation_Check(errors,'to_id')"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-red">
                          گزینه ای یافت نشد
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section avatar>
<!--                          #TODO active lead image-->
                          <q-avatar >
                            <img src="assets/images/icons/lead.png" alt="">
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'to_id')" />
                    </template>
                  </q-select>


                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                  <q-input  :error="this.Methods_Validation_Check(errors,'text')" outlined  type="textarea" v-model="add_items.description" label="توضیحات" rows="4">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'text')" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn glossy color="pink-7" label="افزودن مخاطب "  @click="Item_Create" :loading="loading_add" />
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
        <template v-slot:body-cell-to="props">
          <q-td :props="props" >
            <global_items_lead :lead="props.row.to"></global_items_lead>
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
          <q-td :props="props">
            <div class="text-center">
              <q-btn @click="dialog_edit[props.row.id] = true" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <global_actions_delete_item :loading="loading_delete[props.row.id]" @Set_Ok="Item_Delete(props.row.id)"></global_actions_delete_item>
            </div>

            <q-dialog
                v-model="dialog_edit[props.row.id]"
                position="top"
            >
              <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                  <strong class="text-grey-9 font-14">ویرایش اطلاعات مخاطب : <strong class="text-red">{{props.row.to.name}}</strong></strong>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section>
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                      <q-input  :error="this.Methods_Validation_Check(errors,'text')" outlined  type="textarea" v-model="props.row.description" label="توضیحات" rows="4">
                        <template v-slot:error>
                          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'text')" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn glossy color="blue-7" label="ویرایش اطلاعات "  @click="Item_Edit(props.row)" :loading="loading_add" />
                  <q-btn glossy color="dark" label="بستن" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>





          </q-td>
        </template>

      </q-table>



    </q-card-section>
  </q-card>


</template>


<style scoped>

</style>