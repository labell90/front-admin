<script>
import {mapActions} from "vuex";
import Leads_Profile_Histories_Item from "@/views/leads/leads/profile/components/Leads_Profile_Histories_Item.vue";
import document_item from "@/views/leads/leads/profile/components/Leads_Profile_Documents_Item.vue";

export default {
  name: "Leads_Profile_Histories",
  components : {
    document_item,
    "history_item" : Leads_Profile_Histories_Item,
  },
  props:['lead'],
  mounted() {
    this.query_params.lead_id = this.lead.id;
    this.Item_Get();
  },
  data() {
    return {
      loading_get : true,
      loading_more : false,
      items:[],
      total_items:null,
      page:1,
      query_params:{
        lead_id : null,
        sort_by : 'id',
        sort_type : 'desc',
        search :{}
      },

    }
  },
  methods:{
    ...mapActions([
      "Module_Lead_Logs_Action_Index",
    ]),

    Item_Get(page,per_page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Logs_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
        this.total_items = res.data.result.total
        if (res.data.result.data.length){
          res.data.result.data.forEach(item => {
            this.items.push(item)
          })
        }
        this.loading_get = false;
        this.loading_more = false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })


    },
    Item_Get_More(){
      this.page ++;
      this.loading_more = true;
      this.Item_Get(this.page)

    },


  }
}
</script>


<template>

  <q-card bordered class="shadow-10">
    <q-card-section>
      <div>
        <strong class="text-teal-8 font-16">تاریخچه سرنخ</strong>
        <div class="q-mt-xs">
          <strong class="text-red font-15">{{total_items}}</strong>
          <span class="q-ml-sm text-grey-7">ثبت شده</span>
        </div>
      </div>
      <q-separator class="q-mt-md"/>

      <div class="q-mt-md">

        <global_loading_shape v-if="loading_get" />
        <template v-else>
          <global_images_animation_no_data v-if="items.length < 1"></global_images_animation_no_data>
          <template v-else>
            <div class="q-mb-md" v-for="item in items">
              <history_item :item="item" :lead="lead"></history_item>
            </div>
            <div class="q-mt-md q-mb-lg text-center">
              <q-btn @click="Item_Get_More" :loading="loading_more" glossy color="pink-5" label="مشاهده موارد بیشتر " icon="fas fa-plus" icon-right="fas fa-plus" :disable="items.length >= total_items"></q-btn>
            </div>
          </template>
        </template>
      </div>

    </q-card-section>
  </q-card>


</template>


<style scoped>

</style>