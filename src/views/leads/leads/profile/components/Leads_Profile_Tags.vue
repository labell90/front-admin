<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Tags",
  props:['lead'],
  mounted() {
    this.Get_Tags();
    this.Get_Personal_Tags();
    this.Get_Leads_Tags();
  },
  data(){
    return {
      tags:[],
      personal_tags:[],
      tags_selected:[],
      personal_tags_selected:[],
      tags_items:[],
      personal_tags_items:[],
      loading_tags:true,
      loading_tags_update:false,



    }

  },
  methods:{
    ...mapActions([
        "Module_Lead_Action_Tags_Index",
        "Module_Lead_Action_Tags_Update",
        "Module_tags_All",
        "Module_personal_tags_All"
    ]),
    Get_Leads_Tags(){
      this.Module_Lead_Action_Tags_Index(this.lead.id).then(res=>{
        //generate tags
        res.data.result.tags.forEach((item)=>{
          this.tags_selected.push(item.tag.id);
        })
        //generate personal tags
        res.data.result.personal_tags.forEach((item)=>{
          this.personal_tags_selected.push(item.tag.id);
        })



        this.loading_tags=false;
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })

    },
    Get_Tags(){
      this.Module_tags_All().then(res=>{
        this.tags_items=[];
        res.data.result.forEach((item)=>{
          this.tags_items.push({label:item.name,value:item.id,color_code:item.color_code});
        })

      })
    },

    Get_Personal_Tags(){
      this.Module_personal_tags_All().then(res=>{
        this.personal_tags_items=[];
        res.data.result.forEach((item)=>{
          this.personal_tags_items.push({label:item.name,value:item.id,color_code:item.color_code});
        })

      })
    },
    Tags_Update(){
      this.loading_tags_update=true;
      let data = {
        id : this.lead.id,
        tags : this.tags_selected,
        personal_tags : this.personal_tags_selected,
      }
      this.Module_Lead_Action_Tags_Update(data).then(res=>{
        this.Methods_Notify_Update()
        this.loading_tags_update=false;
        this.$emit('Tags_Updated',true)
      }).catch(error=>{
        if(error.response.status === 409){
          this.Methods_Validation_Notify();
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.loading_tags_update=false;
      })
    },
    Tags_Filter(val, update, abort){
      update(() => {
        if (val){
          this.tags_items =  this.tags_items.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Tags();
        }
      })
    },
    Personal_Tags_Filter(val, update, abort){
      update(() => {
        if (val){
          this.personal_tags_items =  this.personal_tags_items.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Personal_Tags();
        }
      })
    },




  }
}
</script>

<template>

  <global_loading_shape v-if="loading_tags"></global_loading_shape>
  <template v-else>

    <div class="q-mt-sm">
      <q-select
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          v-model="tags_selected"
          label="تگ های عمومی"
          :options="tags_items"
          multiple
          @filter="Tags_Filter"
          emit-value
          map-options
          use-input
          use-chips

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
              <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="q-mt-lg">
      <q-select
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          v-model="personal_tags_selected"
          label="تگ های شخصی"
          :options="personal_tags_items"
          multiple
          @filter="Personal_Tags_Filter"
          emit-value
          map-options
          use-input
          use-chips

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
              <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="q-mt-lg text-right">
      <q-btn glossy @click="Tags_Update" :loading="loading_tags_update"  color="green-8" label="ویراش تگ ها"  icon="fas fa-check"  />
    </div>
  </template>



</template>

<style scoped>

</style>