<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Profile_Index",
  mounted() {
    this.Get_Lead();

  },
  data(){
    return{
      loading:true,
      lead:null
    }
  },
  methods:{
    ...mapActions([
        "Module_Lead_Action_Show"
    ]),
    Get_Lead(){
      this.Module_Lead_Action_Show(this.$route.params.id).then(response => {
        this.lead = response.data.result;
        this.loading = false;
      }).catch(error => {
        this.Methods_Notify_Error_NotFound();
      })
    }
  }
}
</script>

<template>
  <global_loading_shape v-if="loading" />
  <template v-else>
  <div class="q-mb-xl">
    <q-btn :to="{name : 'lead_index'}" class="float-right" color="yellow-9" text-color="black" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
    <q-btn :to="{name : 'lead_edit',params:{id:lead.id}}" class="float-right q-mr-sm" color="blue-8" glossy icon="fas fa-edit" label="ویرایش اطلاعات"></q-btn>

  </div>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-xs q-mb-sm">
        <q-card class="">
          <q-card-section>
            <div class="q-mb-xs">
              <strong class="text-red">اطلاعات شخصی</strong>
            </div>
            <q-separator/>
            <div class="q-mt-sm">
              <div class="text-center">
                <q-avatar size="100px">
                  <img src="/src/assets/images/icons/lead.png" alt="">
                </q-avatar>
              </div>
              <div class="q-mt-sm">

               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">نام و نام خانوادگی :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.name ?? "---"}}</strong>
                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">موبایل :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.phone ?? "---"}}</strong>
                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">آدرس ایمیل :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.email ?? "---"}}</strong>

                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">شرکت :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.company ?? "---"}}</strong>
                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">تلفن :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.tel ?? "---"}}</strong>
                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">فکس :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.fax ?? "---"}}</strong>
                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-6">
                   <span class="text-grey-7">نام برند :</span>
                 </div>
                 <div class="col-6">
                   <strong>{{lead.brand ?? "---"}}</strong>
                 </div>
               </div>
               <div class="row info-box">
                 <div class="col-12">
                   <span class="text-grey-7">توضیحات :</span>
                 </div>
                 <div class="col-12 q-mt-sm">
                   <strong>{{lead.description ?? "---"}}</strong>
                 </div>
               </div>

              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-xs q-mb-sm ">
        <q-card class="">
          <q-card-section>
            <div class="q-mb-xs">
              <strong class="text-red">اطلاعات عمومی</strong>
            </div>
            <q-separator/>
            <div class="q-mt-sm">

              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">دسته بندی :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.lead_category">{{lead.lead_category.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">منابع :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.lead_resource">{{lead.lead_resource.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">وضعیت :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.lead_resource">{{lead.lead_status.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">منبع تبلیغ :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.lead_advsource">{{lead.lead_advsource.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">نوع :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.lead_type">{{lead.lead_type.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">Utm Medium :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.utmmedium">{{lead.utmmedium.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">Utm Source :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.leads_utmsource">{{lead.leads_utmsource.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">صنعت :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.lead_industry">{{lead.lead_industry.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>


            </div>
          </q-card-section>
        </q-card>

      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-xs q-mb-sm">
        <q-card class="">
          <q-card-section>
            <div class="q-mb-xs">
              <strong class="text-red">اطلاعات مکانی</strong>
            </div>
            <q-separator/>
            <div class="q-mt-sm">

              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">کشور :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.country">{{lead.country.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">استان :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.province">{{lead.province.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>
              <div class="row info-box">
                <div class="col-6">
                  <span class="text-grey-7">شهر :</span>
                </div>
                <div class="col-6">
                  <strong v-if="lead.city">{{lead.city.name}}</strong>
                  <strong v-else>---</strong>
                </div>
              </div>



            </div>
          </q-card-section>
        </q-card>

      </div>
    </div>

  </template>

</template>

<style scoped>
.avatar-size{
  width: 120px;
}
.info-box{
  padding-top: 10px;
  padding-bottom: 10px;
}



</style>