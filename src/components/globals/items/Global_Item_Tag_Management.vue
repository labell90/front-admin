<script>
import {mapActions} from "vuex";

export default {
  name: "Global_Item_Tag_Management",
  props:['feature','id'],
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
      add_dialog:false,
      add:{
        name : null,
        color_code:'#ba2d8d',
      },
      add_loading:false,



    }

  },
  methods:{
    ...mapActions([
      "Module_Lead_Action_Tags_Index",
      "Module_Lead_Action_Tags_Update",
      "Module_tags_All",
      "Module_personal_tags_All",
      "Module_personal_tags_Create"
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
    Create_Item(){
      this.add_loading=true;
      this.Module_personal_tags_Create(this.add).then(response => {
        this.add_loading=false;
        this.Methods_Notify_Create();
        this.add_dialog=false
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.add_loading=false;
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
      <div class="q-mt-sm">
        <q-btn size="sm" label="افزودن تگ شخصی" icon="fas fa-plus" color="blue-8" glossy push class="font-12" @click="add_dialog=true"></q-btn>
        <q-dialog
            v-model="add_dialog"
            position="top"
        >
          <q-card style="width: 960px; max-width: 80vw;">
            <q-card-section>
              <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
              <strong class="font-15">افزودن تگ شخصی</strong>

            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                  <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="add.name"  type="text" label="عنوان تگ شخصی">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                    </template>
                  </q-input>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                  <q-input
                      :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="add.color_code" label="رنگ تگ شخصی "
                  >
                    <template v-slot:append>
                      <q-icon name="fas fa-eye-dropper" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-color v-model="add.color_code" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'color_code')" />
                    </template>
                  </q-input>

                </div>
                <div class="col-12 q-pa-xs">
                  <q-btn color="pink-7" :loading="add_loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
                </div>
              </div>
            </q-card-section>


          </q-card>
        </q-dialog>
      </div>
    </div>

    <div class="q-mt-lg text-right">
      <q-btn glossy @click="Tags_Update" :loading="loading_tags_update"  color="green-8" label="ویراش تگ ها"  icon="fas fa-check"  />

    </div>
  </template>



</template>

<style scoped>

</style>