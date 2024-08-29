<script>
import {mapActions} from "vuex";

export default {
  name: "Features_Index",
  mounted() {
    this.Items_Get();
  },
  data(){
    return {
      items:[],
      items_loading:true,
      items_selected:[],
      selected: [],
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


      ]
    }
  },
  methods :{
    ...mapActions([
        "Module_Feature_Action_Index_All"
    ]),

    Items_Get(){
      this.Module_Feature_Action_Index_All().then(res => {
        this.items = res.data.result;
        this.items_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })
    },

    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },



  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10">جستجو و فیلتر پیشترفته</strong>
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
          hide-pagination
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
      >


      </q-table>
    </q-card-section>

  </q-card>

</template>

<style scoped>

</style>