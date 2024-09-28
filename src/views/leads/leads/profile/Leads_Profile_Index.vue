<script>
import {mapActions} from "vuex";
import Leads_Profile_Histories from "@/views/leads/leads/profile/Leads_Profile_Histories.vue";
import Leads_Profile_Notes from "@/views/leads/leads/profile/Leads_Profile_Notes.vue";
import Leads_Profile_Documents from "@/views/leads/leads/profile/Leads_Profile_Documents.vue";
import Leads_Profile_Texts from "@/views/leads/leads/profile/Leads_Profile_Texts.vue";
import Leads_Profile_Campaigns from "@/views/leads/leads/profile/Leads_Profile_Campaigns.vue";

export default {
  name: "Leads_Profile_Index",
  components :{
    'lead_histories' : Leads_Profile_Histories,
    'lead_notes' : Leads_Profile_Notes,
    'lead_documents' : Leads_Profile_Documents,
    'lead_texts' : Leads_Profile_Texts,
    'lead_campaigns' : Leads_Profile_Campaigns,
  },
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
    <q-btn :to="{name : 'lead_index'}" class="float-right" color="grey-7" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
    <q-btn :to="{name : 'lead_edit',params:{id:lead.id}}" class="float-right q-mr-sm" color="blue-8" glossy icon="fas fa-edit" label="ویرایش اطلاعات"></q-btn>
    <q-btn :to="{name : 'lead_info',params:{id:lead.id}}" class="float-right q-mr-sm" color="pink-7" glossy icon="fas fa-list" label="اطلاعات کامل"></q-btn>

  </div>
    <q-card class="q-mt-md rounded-borders" dark bordered >

      <q-card-section>
        <div class="row">
          <div class="col-lg-1 col-md-2 col-sm-4 col-xs-6 q-pa-xs">
            <img width="100" src="/src/assets/images/icons/lead.png" alt="lead">
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
            <div>
              <strong class="font-16">{{lead.name ?? "---"}}</strong>
            </div>
            <div class="q-mt-md">
              <strong class="font-16">{{lead.phone ?? "---"}}</strong>
            </div>
            <div class="q-mt-md">
              <strong class="font-16">{{lead.email ?? "---"}}</strong>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
            <div>
              <span class="text-pink-4 font-14 font-weight-500">شرکت : </span>
              <strong class="font-15">{{lead.company ?? "---"}}</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">تلفن : </span>
              <strong class="font-15">{{lead.phone ?? "---"}}</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">فکس : </span>
              <strong class="font-15">{{lead.fax ?? "---"}}</strong>
            </div>

          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
            <div>
              <span class="text-pink-4 font-14 font-weight-500">برند : </span>
              <strong class="font-15">{{lead.brand ?? "---"}}</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">استان : </span>
              <strong  class="font-15" v-if="lead.province">{{lead.province.name}}</strong>
              <strong  class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">شهر : </span>
              <strong  class="font-15" v-if="lead.city">{{lead.city.name}}</strong>
              <strong  class="font-15" v-else>---</strong>
            </div>

          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
            <div>
              <span class="text-pink-4 font-14 font-weight-500">دسته بندی : </span>
              <strong class="font-15" v-if="lead.lead_category">{{lead.lead_category.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">منابع : </span>
              <strong class="font-15" v-if="lead.lead_resource">{{lead.lead_resource.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">وضعیت : </span>
              <strong class="font-15" v-if="lead.lead_status">{{lead.lead_status.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">Utm Source : </span>
              <strong class="font-15" v-if="lead.lead_utm_source">{{lead.lead_utm_source.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
            <div>
              <span class="text-pink-4 font-14 font-weight-500">منبع تبلیغ : </span>
              <strong class="font-15" v-if="lead.lead_advsource">{{lead.lead_advsource.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">نوع : </span>
              <strong class="font-15" v-if="lead.lead_type">{{lead.lead_type.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">صنعت : </span>
              <strong class="font-15" v-if="lead.lead_industry">{{lead.lead_industry.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
            <div class="q-mt-md">
              <span class="text-pink-4 font-14 font-weight-500">Utm Medium : </span>
              <strong class="font-15" v-if="lead.lead_utm_medium">{{lead.lead_utm_medium.name}}</strong>
              <strong class="font-15" v-else>---</strong>
            </div>
          </div>
        </div>
        <q-separator class="q-mt-md q-mb-md" color="grey-8"/>
          <div class="row">

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_notes' && this.$route.name !== 'lead_profile'}">
              <router-link :to="{name : 'lead_profile_notes',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                  <div class="col-lx-4 col-lg-5 col-md-6">
                    <img src="assets/images/icons/notes.png" width="60" alt="">
                  </div>
                  <div class="col-lx-8 col-lg-7 col-md-6">
                    <div class="q-mt-lg">
                      <strong class="text-teal-13 menu-title">یادداشت ها</strong>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_histories'}">
              <router-link :to="{name : 'lead_profile_histories',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                  <div class="col-xl-4 col-lg-5 col-md-6">
                    <img src="assets/images/icons/history.png" width="60" alt="">
                  </div>
                  <div class="col-xl-8 col-lg-7 col-md-6">
                    <div class="q-mt-lg">
                      <strong class="text-teal-13 menu-title">تاریخچه سرنخ</strong>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_texts'}">
              <router-link :to="{name : 'lead_profile_texts',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                <div class="col-xl-4 col-lg-5 col-md-6">
                  <img src="assets/images/icons/sms.png" width="60" alt="">
                </div>
                <div class="col-lx-8 col-lg-7 col-md-6">
                  <div class="q-mt-lg">
                    <strong class="text-teal-13 menu-title">پیامک ها</strong>
                  </div>
                </div>
              </div>
              </router-link>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_emails'}">
              <router-link :to="{name : 'lead_profile_texts',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                <div class="col-xl-4 col-lg-5 col-md-6">
                  <img src="assets/images/icons/email.png" width="60" alt="">
                </div>
                <div class="col-lx-8 col-lg-7 col-md-6">
                  <div class="q-mt-lg">
                    <strong class="text-teal-13 menu-title">ایمیل ها</strong>
                  </div>
                </div>
              </div>
              </router-link>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_documents'}">
              <router-link :to="{name : 'lead_profile_documents',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                <div class="col-xl-4 col-lg-5 col-md-6">
                  <img src="assets/images/icons/document.png" width="60" alt="">
                </div>
                <div class="col-lx-8 col-lg-7 col-md-6">
                  <div class="q-mt-lg">
                    <strong class="text-teal-13 menu-title">اسناد و مدارک</strong>
                  </div>
                </div>
              </div>
              </router-link>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_campaigns'}">
              <router-link :to="{name : 'lead_profile_campaigns',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                <div class="col-lx-4 col-lg-5 col-md-6">
                  <img src="assets/images/icons/campaigns.png" width="60" alt="">
                </div>
                <div class="col-lx-8 col-lg-7 col-md-6">
                  <div class="q-mt-lg">
                    <strong class="text-teal-13 menu-title">کمپین ها</strong>
                  </div>
                </div>
              </div>
              </router-link>
            </div>

          </div>
      </q-card-section>

    </q-card>

    <div class="q-mt-md">
      <lead_notes :lead="lead" v-if="this.$route.name === 'lead_profile_notes' || this.$route.name === 'lead_profile'" class="animation-fade-in"></lead_notes>
      <lead_histories v-if="this.$route.name === 'lead_profile_histories'" class="animation-fade-in"></lead_histories>
      <lead_documents :lead="lead" v-if="this.$route.name === 'lead_profile_documents'" class="animation-fade-in"></lead_documents>
      <lead_texts :lead="lead" v-if="this.$route.name === 'lead_profile_texts'" class="animation-fade-in"></lead_texts>
      <lead_campaigns :lead="lead" v-if="this.$route.name === 'lead_profile_campaigns'" class="animation-fade-in"></lead_campaigns>

    </div>

  </template>

</template>

<style scoped>
.glossy-bg{
  background-color: rgba(255,255,255,0.09);
}
.gray-filter{
  filter: grayscale(100%);
}
.menu-title{
  font-size: 14px;
}


</style>