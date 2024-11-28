<script>
import {mapActions} from "vuex";


export default {
  name: "Campaigns_Create",
  components:{

  },
  mounted() {
    this.items.jalali_start_date = this.Methods_Date_Today();
  },
  //#TODO add image from media
  data(){
    return {
      loading:false,
      errors:[],
      jalali_start_date:null,
      jalali_end_date:null,
      jalali_desired_end_date:null,
      items:{
        name:null,
        color_code:'#ba2d8d',
        code:null,
        campaign_status_id:null,
        campaign_type_id:null,
        market_target:null,
        market_width:null,
        start_date:null,
        end_date:null,
        desired_end_date:null,
        sponsor:null,
        sent_number:null,
        desired_cost:null,
        real_cost:null,
        desired_answer:null,
        desired_income:null,
        desired_sales:null,
        real_sales:null,
        desired_receive:null,
        real_investment_rate:null,
        desired_investment_rate:null,
        real_receive:null,
        description:null,
      },
      campaign_types:[],
      campaign_statuses:[]

    }
  },
  methods:{
    ...mapActions([
      "Module_Campaign_Action_Create",
      "Module_Campaign_Statuses_Action_All",
      "Module_Campaign_Types_Action_All",
    ]),
    Create_Item(){
      this.loading=true;
      //convert jalali dates models
      if (this.jalali_start_date){
        this.items.start_date = this.Methods_Date_Jalali_To_Gregorian(this.jalali_start_date)
      }
      if (this.jalali_end_date){
        this.items.end_date = this.Methods_Date_Jalali_To_Gregorian(this.jalali_end_date)
      }
      if (this.jalali_desired_end_date){
        this.items.desired_end_date = this.Methods_Date_Jalali_To_Gregorian(this.jalali_desired_end_date)
      }

      this.Module_Campaign_Action_Create(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Create();
        this.$router.push({name:'campaigns_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },
    Get_Campaign_Statuses(){
      this.Module_Campaign_Statuses_Action_All().then(res => {
        if (res.data.result.length){
          this.campaign_statuses=[];
          res.data.result.forEach(item => {
            this.campaign_statuses.push({
              label : item.name,
              value : item.id,
              color_code : item.color_code
            })
          })
        }
        console.log(this.campaign_statuses)
      }).catch(error => {
        return this.Methods_Notify_Error_Server()
      })

    },
    Get_Campaign_Types(){
      this.Module_Campaign_Types_Action_All().then(res => {
        if (res.data.result.length){
          this.campaign_types=[];
          res.data.result.forEach(item => {
            this.campaign_types.push({
              label : item.name,
              value : item.id,
              color_code : item.color_code
            })
          })
        }
        console.log(this.campaign_statuses)
      }).catch(error => {
        return this.Methods_Notify_Error_Server()
      })

    },
    Filter_Campaign_Statuses_Select (val, update, abort) {
      update(() => {
        if (val){
          this.campaign_statuses =  this.campaign_statuses.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Campaign_Statuses();
        }
      })
    },
    Filter_Campaign_Types_Select (val, update, abort) {
      update(() => {
        if (val){
          this.campaign_types =  this.campaign_types.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Campaign_Types();
        }
      })
    },



  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10">افزودن کمپین جدید</strong>
      <global_actions_header_buttons :index="true"  route="campaigns"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>

    </q-card-section>
    <q-card-section>
      <div class="row">

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان کمپین">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'code')" outlined v-model="items.code"  type="text" label="کد کمپین">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'code')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.campaign_status_id"
              label="انتخاب وضعیت"
              :options="campaign_statuses"
              @filter="Filter_Campaign_Statuses_Select"
              emit-value
              map-options
              use-input
              :error="this.Methods_Validation_Check(errors,'campaign_status_id')"
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
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'campaign_status_id')" />
            </template>
          </q-select>

        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.campaign_type_id"
              label="انتخاب نوع"
              :options="campaign_types"
              @filter="Filter_Campaign_Types_Select"
              emit-value
              map-options
              use-input
              :error="this.Methods_Validation_Check(errors,'campaign_type_id')"
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
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'campaign_type_id')" />
            </template>
          </q-select>

        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'market_target')" outlined v-model="items.market_target"  type="text" label="جامعه هدف">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'market_target')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'market_width')" outlined v-model="items.market_width"  type="number" label="وسعت جامعه هدف">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'market_width')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input :error="this.Methods_Validation_Check(errors,'start_date')" outlined v-model="jalali_start_date" mask="date" label="تاریخ شروع">
            <template v-slot:append>
              <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date color="pink-7" dark v-model="jalali_start_date" calendar="persian" mask="YYYY/MM/DD">
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'start_date')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input :error="this.Methods_Validation_Check(errors,'end_date')" outlined v-model="jalali_end_date" mask="date" label="تاریخ پایان">
            <template v-slot:append>
              <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date color="pink-7" dark v-model="jalali_end_date" calendar="persian" mask="YYYY/MM/DD">
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'end_date')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input :error="this.Methods_Validation_Check(errors,'desired_end_date')" outlined v-model="jalali_desired_end_date" mask="date" label="تاریخ قابل انتظار پایان">
            <template v-slot:append>
              <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date color="pink-7" dark v-model="jalali_desired_end_date" calendar="persian" mask="YYYY/MM/DD">
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_end_date')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'sponsor')" outlined v-model="items.sponsor"  type="text" label="اسپانسر">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'sponsor')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'sent_number')" outlined v-model="items.sent_number"  type="number" label="تعداد ارسالی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'sent_number')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'desired_cost')" outlined v-model="items.desired_cost"  type="number" label="بهای قابل انتظار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_cost')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'real_cost')" outlined v-model="items.real_cost"  type="number" label="بهای واقعی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'real_cost')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'desired_answer')" outlined v-model="items.desired_answer"  type="text" label="پاسخ قابل انتظار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_answer')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'desired_income')" outlined v-model="items.desired_income"  type="number" label="درآمد قابل انتظار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_income')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'desired_sales')" outlined v-model="items.desired_sales"  type="number" label="تعداد فروش قابل انتظار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_sales')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'real_sales')" outlined v-model="items.real_sales"  type="number" label="تعداد فروش واقعی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'real_sales')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'desired_receive')" outlined v-model="items.desired_receive"  type="number" label="مقدار دریافتی قابل انتظار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_receive')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'real_receive')" outlined v-model="items.real_receive"  type="number" label="مقدار دریافتی واقعی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'real_receive')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'desired_investment_rate')" outlined v-model="items.desired_investment_rate"  type="text" label="نرخ بازگشت قابل انتظار">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'desired_investment_rate')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'real_investment_rate')" outlined v-model="items.real_investment_rate"  type="text" label="نرخ بازگشت واقعی">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'real_investment_rate')" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-xs">
          <q-input
              :error="this.Methods_Validation_Check(errors,'color_code')" outlined v-model="items.color_code" label="رنگ کمپین"
          >
            <template v-slot:append>
              <q-icon name="fas fa-eye-dropper" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="items.color_code" />
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'color_code')" />
            </template>
          </q-input>

        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
          <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description" type="textarea" label="توضیحات">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
            </template>
          </q-input>
        </div>

        <div class="col-12 q-pa-xs">
          <q-btn color="pink-7" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>