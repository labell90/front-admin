<script>
import {mapActions} from "vuex";

export default {
  name: "Personal_Tags_Index",
  mounted() {
    this.Items_Get();
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
          label: 'نام',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'color_code',
          value: 'color_code',
          label: 'رنگ',
          align: 'left',
          sortable: false,
          field: row => row.color_code,
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
      "Module_personal_tags_Index",
      "Module_personal_tags_Delete",
      "Module_personal_tags_Searchable"


    ]),
    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_personal_tags_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
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
      this.Module_personal_tags_Searchable().then(res => {
        this.searchable = res.data.result
        console.log(this.searchable)
      })
    },
    Item_Delete(id){
      this.delete_loading=true;
      this.Module_personal_tags_Delete(id).then(res => {
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
      <global_actions_header_buttons :create="true"  :archive="true" route="personal_tags"></global_actions_header_buttons>

      <q-separator class="q-mt-xl"/>
        <strong class="text-teal-8">جستجو و فیلتر پیشترفته</strong>
        <div class="q-mt-sm">
          <global_searching_full_search @Search="(data) => Items_Search(data)" v-if="searchable.length" :items="searchable" ></global_searching_full_search>
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
      >
        <template v-slot:body-cell-name="props">

          <q-td :props="props">
            <div class="row q-pt-xs q-pb-xs" >
              <div class="q-ml-sm q-mt-sm"><strong>{{ props.row.name }}</strong></div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-color_code="props">
          <q-td :props="props" :style="'background-color:'+props.row.color_code ">

          </q-td>
        </template>
        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn :to="{name:'personal_tags_edit',params:{id:props.row.id}}" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
            </div>
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
      </q-table>
    </q-card-section>

  </q-card>

</template>

<style scoped>

</style>