<script>
import {mapActions} from "vuex";

export default {
  name: "Stores_Inventory",
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
          name: 'product',
          value: 'product',
          label: 'محصول',
          align: 'left',
          sortable: false,
          field: row => row.product,
        },
        {
          name: 'quantity',
          value: 'quantity',
          label: 'موجودی',
          align: 'left',
          sortable: true,
          field: row => row.quantity,
        },
        {
          name: 'orderable_quantity',
          value: 'orderable_quantity',
          label: 'موجودی قابل سفارش',
          align: 'left',
          sortable: false,
          field: row => row.orderable_quantity,
        },
        {
          name: 'reorder_point',
          value: 'reorder_point',
          label: 'نقطه سفارش مجدد',
          align: 'left',
          sortable: false,
          field: row => row.reorder_point,
        },
        {
          name: 'order_limit',
          value: 'order_limit',
          label: 'محدودیت سفارش',
          align: 'left',
          sortable: false,
          field: row => row.order_limit,
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
      "Module_Stores_Inventory_Index",
    ]),
    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Stores_Index({store_id:this.$route.params.id,per_page:per_page,page:page,params:this.query_params}).then(res => {
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
  <div>
    sfsdfsdf
  </div>

</template>

<style scoped>

</style>