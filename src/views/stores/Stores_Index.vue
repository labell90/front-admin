<script>
import {mapActions} from "vuex";

export default {
  name: "Stores_Index",
  mounted() {
    this.Items_Get();
    this.Searchable_Get();
    this.Columns_Generate();

  },
  data(){
    return {
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
      items_selected:[],
      selected: [],
      pagination: {
        sortBy : 'id',
        descending:true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      },
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
          name: 'name',
          value: 'name',
          label: 'نام انبار',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },

        {
          name: 'sender_name',
          value: 'sender_name',
          label: 'فرستنده ',
          align: 'left',
          sortable: true,
          field: row => row.sender_name,
        },
        {
          name: 'sender_phone',
          value: 'sender_phone',
          label: 'تلفن فرستنده',
          align: 'left',
          sortable: false,
          field: row => row.sender_phone,
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
      tags_dialog:[]
    }
  },
  methods :{
    ...mapActions([
      "Module_Stores_Index",
      "Module_Stores_Delete",
        "Module_Stores_Searchable"



    ]),
    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Stores_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
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

    Item_Delete(id)
    {
      this.delete_loading=true;
      this.Module_Stores_Delete(id).then(res => {
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
    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },
    Searchable_Get(){
      this.Module_Stores_Searchable().then(res => {
        this.searchable = res.data.result
        console.log(this.searchable)
      })
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
    },
  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <global_actions_header_buttons :create="true" :archive="true" route="stores"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>

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
      >




        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
            <global_actions_activation_item @Set_Ok="Item_Activation(props.row.id)" :status="props.row.is_active"></global_actions_activation_item>
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

        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn :to="{name:'stores_edit',params:{id:props.row.id}}" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <q-btn :to="{name:'stores_inventory',params:{id:props.row.id}}" glossy title=" کنترل موجودی" class="q-ma-xs" color="teal-8" icon="fas fa-cart-flatbed" size="9px" round  />
              <q-btn @click="tags_dialog[props.row.id]=true"  glossy title=" تگ ها" class="q-ma-xs" color="orange-8" icon="fas fa-tag" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
              <q-dialog
                  v-model="tags_dialog[props.row.id]"
                  position="top"
              >
                <q-card style="width: 960px; max-width: 80vw;">
                  <q-card-section>
                    <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
                    <strong class="font-15">ویرایش تگ های انبار</strong>
                  </q-card-section>
                  <q-separator/>
                  <q-card-section>
                    <global_tags ></global_tags>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>

      </q-table>
    </q-card-section>

  </q-card>

</template>

<style scoped>

</style>