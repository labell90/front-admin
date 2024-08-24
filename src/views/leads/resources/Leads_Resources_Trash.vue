<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Resources_Trash",
  mounted() {
    this.Items_Get();
  },
  data(){
    return {
      items:[],
      items_loading:true,
      delete_loading:false,
      restore_loading:false,
      activation_loading:false,
      items_selected:[],
      selected: [],
      pagination: {
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
          required: true,
          label: 'نام',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'color_code',
          required: true,
          label: 'رنگ',
          align: 'left',
          sortable: false,
          field: row => row.color_code,
        },


        {
          name: 'created_at',
          required: true,
          label: 'ت ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_at,
        },

        {
          name: 'updated_at',
          required: true,
          label: 'ت ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_at,
        },
        {
          name: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ]
    }
  },
  methods :{
    ...mapActions([
      "Module_Lead_Resource_Action_Trash_Index",
      "Module_Lead_Resource_Action_Restore_Delete",
      "Module_Lead_Resource_Action_Restore",


    ]),
    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Resource_Action_Trash_Index({per_page:per_page,page:page}).then(res => {
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
    Item_Delete(id){
      this.delete_loading=true;
      this.Module_Lead_Resource_Action_Restore_Delete(id).then(res => {
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
    Item_Restore(id){
      this.delete_loading=true;
      this.Module_Lead_Resource_Action_Restore(id).then(res => {
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
      this.Items_Get(rowsPerPage,page);

    },


  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10">جستجو و فیلتر پیشترفته</strong>
      <q-btn :to="{name : 'lead_resources_create'}" class="float-right" color="teal-8"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
      <q-btn :to="{name : 'lead_resources_index'}" class="float-right q-mr-sm" color="yellow-9" text-color="dark" icon="fas fa-backward" glossy label="بازگشت"></q-btn>

    </q-card-section>
    <q-card-section>
      <q-table
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title="لیست آیتم ها"
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
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="q-ml-sm q-mt-sm"><strong>{{ props.row.name }}</strong></div>
          </q-td>
        </template>
        <template v-slot:body-cell-color_code="props">
          <q-td :props="props" :style="'background-color:'+props.row.color_code ">

          </q-td>
        </template>

        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <global_actions_restore_item @Set_Ok="Item_Restore(props.row.id)" :loading="restore_loading"></global_actions_restore_item>
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