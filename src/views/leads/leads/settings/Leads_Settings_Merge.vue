<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Settings_Merge",
  data(){
    return {
      phone : null,
      search_loading : false,
      merge_loading : false,
      leads : [],
      lead_id : null,
      searched : false,
      errors:[]
    }
  },
  methods:{
    ...mapActions([
        "Module_Lead_Action_All",
        "Module_Lead_Action_Actions_Merge"
    ]),
    Search_Leads(){
      if (this.phone){
        this.search_loading =true;
        this.searched=true;
        this.Module_Lead_Action_All({phone : this.phone}).then(res => {
          if (res.data.result){
            res.data.result.forEach(item => {
              this.leads.push({label : item.name , value : item.id , })
            })
          }
          this.search_loading=false;
        }).catch(error => {
          this.Methods_Notify_Error_Server();
          this.search_loading=false;
        });
      }
    },
    Filter_Lead_Select (val, update, abort) {
      update(() => {
        if (val){
          this.leads =  this.leads.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Search_Leads();
        }
      })
    },
    Merge_Leads(){
      this.merge_loading=true;
      this.Module_Lead_Action_Actions_Merge({lead_id : this.lead_id}).then(res => {
        this.$emit('Merge_Leads');
        this.merge_loading=false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.merge_loading=false
      })

    },



  }
}
</script>

<template>
  <strong class="text-teal-9"> ادغام کردن سرنخ های یکسان</strong>

  <div class="q-mt-lg">
    <span class="font-14">برای جستجو سرنخ مورد نظر شماره موبایل سرنخ را وارد کرده و کلید جستجو را بزنید </span>
    <q-input  class="q-mt-sm" dir="ltr"  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="phone"  type="text" placeholder="09XX XXX XXXX" >
      <template v-slot:error>
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
      </template>
    </q-input>
    <q-btn :disable="!phone" @click="Search_Leads" glossy icon="fas fa-search" color="blue-7" label="جستجو سرنخ"></q-btn>
    <div class="q-mt-md">
      <global_loading_shape v-if="search_loading"/>
      <div v-else>
        <template v-if="searched">
          <template v-if="leads.length">
            <div class="q-mt-md">
              <q-banner class="bg-grey-4 rounded-borders">
                <span>تعداد : <strong class="text-green-10 font-16">{{leads.length}}</strong> سرنخ ثبت شده با این شماره موبایل یافت شد ، برای ادغام کردن سرنخ لطفا یک سرنخ را به عنوان سرنخ اصلی انتخاب کرده و کلید اذغام را بزنید</span>
              </q-banner>
            </div>
            <div class="q-mt-md q-mb-lg">
              <q-select
                  dir="ltr"
                  outlined
                  menu-anchor="center start"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="lead_id"
                  label="انتخاب سرنخ اصلی"
                  :options="leads"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'lead_id')"
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
                    <q-item-section>

                      <q-item-label>
                        <strong class="text-red"># {{scope.opt.value}}</strong>
                        :
                        {{ scope.opt.label }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'lead_id')" />
                </template>
              </q-select>
              <q-btn :loading="merge_loading" :disable="!lead_id" @click="Merge_Leads" glossy color="teal-8" icon="fas fa-check" label="انجام عملیات ادغام"></q-btn>
            </div>

          </template>
          <template v-else>
            <global_images_animation_no_data></global_images_animation_no_data>
          </template>

        </template>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>