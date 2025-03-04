<script>
import {mapActions} from "vuex";
import products_coding from "@/views/products/components/Products_Coding.vue";
import product_prices from "@/views/products/components/Products_Prices.vue";

export default {
  name: "Stores_Inventory",
  components: {product_prices, products_coding},
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
      convert_dialog:[],
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
        "Module_Stores_Searchable"
    ]),
    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Stores_Inventory_Index({store_id:this.$route.params.id,per_page:per_page,page:page,params:this.query_params}).then(res => {
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
  <q-card>
    <q-card-section>
      <q-btn  @click="convert_dialog[props.row.id] = true" class="float-right" color="indigo-8"  glossy icon="fas fa-plus" size="11px" round>
        <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
          افزودن آیتم
        </q-tooltip>
      </q-btn>
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
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="q-ml-sm q-mt-sm"><strong>{{ props.row.name }}</strong></div>
          </q-td>
        </template>

        <template v-slot:body-cell-product="props">
          <q-td :props="props">
            <span v-if="props.row.product" class="text-grey-8">{{props.row.product.name}}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <span v-if="props.row.quantity" class="text-grey-8">{{props.row.quantity}}</span>
          </q-td>
        </template>



        <template v-slot:body-cell-orderable_quantity="props">
          <q-td :props="props">
            <span v-if="props.row.orderable_quantity" class="text-grey-8">{{props.row.orderable_quantity}}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-reorder_point="props">
          <q-td :props="props">
            <span v-if="props.row.quantity" class="text-grey-8">{{props.row.reorder_point}}</span>
          </q-td>
        </template>


        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn :to="{name:'products_edit',params:{id:props.row.id}}" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <q-btn @click="convert_dialog[props.row.id] = true" glossy class="q-ma-xs" color="purple-9" icon="fas fa-pencil" size="9px" round title="کد گذاری محصول"/>
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