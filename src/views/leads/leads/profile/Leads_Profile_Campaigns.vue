<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Campaigns",
  props:['lead'],
  mounted() {
    this.query_params.lead_id = this.lead.id;
    this.Campaigns_Get();
    this.Item_Get();
  },
  data(){
    return {
      dialog_add : false,
      dialog_edit :[],
      loading_add : false,
      loading_delete : false,
      loading_edit : false,
      loading_get : true,
      loading_more : false,
      add_items : {
        campaign_id : null,
        description : null
      },
      items:[],
      campaigns:[],
      total_items:null,
      page:1,
      query_params:{
        lead_id : null,
        sort_by : 'id',
        sort_type : 'desc',
        search :{}
      },
      errors:[],

    }
  },
  methods : {
    ...mapActions([
      "Module_Lead_Campaign_Action_Index",
      "Module_Lead_Campaign_Action_Create",
      "Module_Lead_Campaign_Action_Edit",
      "Module_Lead_Campaign_Action_Delete",
      "Module_Campaign_Action_All"

    ]),
    Campaigns_Get(){
      this.Module_Campaign_Action_All().then(res => {
        if (res.data.result.length > 0){
          this.campaigns=[];
          res.data.result.forEach(item => {
            this.campaigns.push({
              label : item.name,
              value : item.id,
              color_code : item.color_code,
              is_active : item.is_active,
            })
          })

        }


      })


    },
    Item_Get(page,per_page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Lead_Campaign_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
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
    Item_Create(){
      this.loading_add=true;
      let data = {
        campaign_id : this.add_items.campaign_id,
        description : this.add_items.description,
        lead_id : this.lead.id
      }
      this.Module_Lead_Document_Action_Create(data).then(res => {
        this.loading_get = true;
        this.items=[];
        this.Item_Get(this.page)
        this.loading_add = false;
        this.dialog_add=false;
        this.add_items = {
          campaign_id : null,
          description : null
        };
        this.Methods_Notify_Create();
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }

        this.loading_add=false;
      })

    },
    Item_Edit(){
      this.loading_get = true;
      this.items=[];
      this.Item_Get(this.page)
    },
    Item_Delete(id){
      this.loading_get = true;
      this.items=[];
      this.Item_Get(this.page)
    },

    Filter_Campaign_Select (val, update, abort) {
      update(() => {
        if (val){
          this.campaigns =  this.campaigns.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Campaigns_Get();
        }
      })
    },


  }


}
</script>

<template>

  <q-card bordered class="shadow-10">
    <q-card-section>
      <div>
        <strong class="text-teal-8 font-16">لیست کمپین های سرنخ </strong>
        <q-btn @click="dialog_add=true" class="float-right" color="pink-7"  glossy icon="fas fa-notes-medical" label="افزودن به کمپین جدید "></q-btn>
        <q-dialog
            v-model="dialog_add"
            position="top"
        >
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <strong class="text-grey-9 font-16">افزودن سرنخ به کمپین </strong>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                  <q-select
                      outlined
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="items.campaign_id"
                      label="انتخاب کمپین"
                      :options="campaigns"
                      @filter="Filter_Campaign_Select"
                      emit-value
                      map-options
                      use-input
                      :error="this.Methods_Validation_Check(errors,'campaign_id')"

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
                        <q-item-section side>
                          <q-icon v-if="scope.opt.is_active" name="fas fa-check" color="green-7" size="xs"></q-icon>
                          <q-icon v-else name="fas fa-times" color="red-7" size="xs"></q-icon>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'campaign_id')" />
                    </template>
                  </q-select>

                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-sm">
                  <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined  type="textarea" v-model="add_items.description" label="توضیحات" rows="4">
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn glossy color="pink-7" label="افرودن به کمپین"  @click="Item_Create" :loading="loading_add" />
              <q-btn glossy color="dark" label="بستن" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div class="q-mt-xs">
          <strong class="text-red font-15">{{total_items}}</strong>
          <span class="q-ml-sm text-grey-7">ثبت شده</span>
        </div>

      </div>
      <q-separator class="q-mt-md"/>
      <div class="q-mt-md q-mb-lg">
        <div class="row">
          <div v-for="item in items" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs q-mt-sm">
            <q-card class="shadow-5 rounded-borders">
              <q-card-section>
                <div class="row">
                  <div class="col-lg-2">
                    <img src="assets/images/icons/connection.png" width="100" alt="">
                  </div>
                  <div class="col-lg-8">
                    <span class="text-grey-8">نام کمپین : </span>
                    <q-chip class="round" :style="'background-color:'+item.campaign.color_code" size="xs"></q-chip>

                    <strong>{{item.campaign.name}}</strong>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>


</template>


<style scoped>

</style>