<script>
import {mapActions} from "vuex";

export default {
  name: "Forms_Index",
  mounted() {
    this.Items_Get();
  },
  data(){
    return {
      items:[],
      items_loading:true,
      delete_loading:false,
      activation_loading:false,
      items_selected:[],
      selected: [],
      dialog_details: [],
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
          label: 'عنوان',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'title',
          required: true,
          label: 'تیتر',
          align: 'left',
          sortable: true,
          field: row => row.title,
        },
        {
          name: 'type',
          required: true,
          label: 'نوع فرم',
          align: 'left',
          sortable: true,
          field: row => row.type,
        },
        {
          name: 'uses_count',
          required: true,
          label: 'نعداد استفاده',
          align: 'left',
          sortable: true,
          field: row => row.uses_count,
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
      "Module_Form_Action_Index",
      "Module_Form_Action_Delete",
      "Module_Form_Action_Activation",
    ]),

    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Form_Action_Index({per_page:per_page,page:page}).then(res => {
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
      this.Module_Form_Action_Delete(id).then(res => {
        this.items = this.items.filter(item => {
          return item.id !== id;
        })
        this.Methods_Notify_Delete();
        this.delete_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.delete_loading=false;
      })

    },
    Item_Activation(id){
      this.activation_loading=true;
      this.Module_Form_Action_Activation(id).then(res => {
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
      <q-btn :to="{name : 'forms_create'}" class="float-right" color="pink-7"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
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
        <template v-slot:body-cell-uses_count="props">
          <q-td :props="props">
            <q-chip color="teal-7" text-color="white">
              <strong>{{props.row.uses_count}}</strong>
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-type="props">
          <q-td :props="props">
            <q-chip color="blue-7" text-color="white">
              <strong>{{props.row.type}}</strong>
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn @click="dialog_details[props.row.id] = true" glossy title="مشاهده جزئیات" class="q-ma-xs" color="deep-orange-5" icon="fas fa-list" size="9px" round  />
              <q-dialog v-model="dialog_details[props.row.id]">
                <q-card style="width: 1960px!important;">
                  <q-toolbar>
                    <q-avatar>
                      <q-icon name="fas fa-list" color="deep-orange-5"></q-icon>
                    </q-avatar>

                    <q-toolbar-title>
                     <span class="font-14">
                        مشاهده جزئیات :
                     </span>
                      <strong class="font-14">
                        {{props.row.name}}
                      </strong>
                    </q-toolbar-title>

                    <q-btn flat round dense icon="fa fa-times text-red" v-close-popup />
                  </q-toolbar>
                  <q-card-section>

                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-btn :to="{name:'forms_edit',params:{id:props.row.id}}" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
            </div>
          </q-td>
        </template>

      </q-table>
    </q-card-section>

  </q-card>


</template>

<style scoped>
.dialog-width{
  width: 960px !important;
}
</style>