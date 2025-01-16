<script>
import {mapActions} from "vuex";
import Leads_Profile_Histories from "@/views/leads/leads/profile/Leads_Profile_Histories.vue";
import Leads_Profile_Notes from "@/views/leads/leads/profile/Leads_Profile_Notes.vue";
import Leads_Profile_Documents from "@/views/leads/leads/profile/Leads_Profile_Documents.vue";
import Leads_Profile_Texts from "@/views/leads/leads/profile/Leads_Profile_Texts.vue";
import Leads_Profile_Campaigns from "@/views/leads/leads/profile/Leads_Profile_Campaigns.vue";
import Leads_Profile_Emails from "@/views/leads/leads/profile/Leads_Profile_Emails.vue";
import Leads_Profile_Contacts from "@/views/leads/leads/profile/Leads_Profile_Contacts.vue";
import leads_settings_merge from "@/views/leads/leads/settings/Leads_Settings_Merge.vue";
import Leads_Profile_Tags from "@/views/leads/leads/profile/components/Leads_Profile_Tags.vue";

export default {
  name: "Leads_Profile_Index",
  components :{
    leads_settings_merge,
    'lead_histories' : Leads_Profile_Histories,
    'lead_notes' : Leads_Profile_Notes,
    'lead_documents' : Leads_Profile_Documents,
    'lead_texts' : Leads_Profile_Texts,
    'lead_campaigns' : Leads_Profile_Campaigns,
    'lead_emails' : Leads_Profile_Emails,
    'lead_contacts' : Leads_Profile_Contacts,
    'leads_tags' : Leads_Profile_Tags,
  },
  mounted() {
    this.Get_Lead();
  },
  data(){
    return{
      loading:true,
      lead:null,
      tags_dialog:false,

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
  <div class=" text-right q-pa-xs">

    <q-btn class="q-mr-xs" :to="{name : 'lead_info',params:{id:lead.id}}" color="pink-8" glossy icon="fas fa-info" size="11px" round>
      <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
        اطلاعات کامل
      </q-tooltip>
    </q-btn>

    <q-btn @click="tags_dialog=true" class="q-mr-xs" color="green-8" glossy icon="fas fa-tag" size="11px" round>
      <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
        تگ ها (برچسب ها)
      </q-tooltip>
    </q-btn>

    <q-btn class="q-mr-xs" :to="{name : 'lead_edit',params:{id:lead.id}}" color="blue-8" glossy icon="fas fa-edit" size="11px" round>
      <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
        ویرایش اطلاعات
      </q-tooltip>
    </q-btn>

    <q-btn :to="{name : 'lead_index'}" color="grey-8"  glossy icon="fas fa-arrow-left" size="11px" round>
      <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
        بازگشت
      </q-tooltip>
    </q-btn>


    <q-dialog
        v-model="tags_dialog"
        position="top"
    >
      <q-card style="width: 960px; max-width: 80vw;">
        <q-card-section>
          <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
          <strong class="font-15">ویرایش تگ های سرنخ</strong>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <leads_tags @Tags_Updated="tags_dialog=false" :lead="lead"></leads_tags>
        </q-card-section>


      </q-card>
    </q-dialog>





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
            <div class="q-mt-md">
              <q-chip v-if="!lead.tags.length" size="sm" class="font-11" label="# بدون تگ" color="deep-orange-8" text-color="white"></q-chip>
              <template v-else>
                <div class="q-gutter-xs">
                  <global_items_tag_single v-for="tag in lead.tags" :item="tag.tag"></global_items_tag_single>
                  <span @click="tags_dialog=true" class="cursor-pointer">
                     <q-chip size="sm" class="font-11" label="بیشتر ..." text-color="white" color="blue-7"></q-chip>
                  </span>

                </div>

              </template>
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
              <router-link :to="{name : 'lead_profile_emails',params : {id:lead.id}}">
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

            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" :class="{'gray-filter' : this.$route.name !== 'lead_profile_contacts'}">
              <router-link :to="{name : 'lead_profile_contacts',params : {id:lead.id}}">
                <div class="q-pa-sm rounded-borders glossy-bg row">
                <div class="col-lx-4 col-lg-5 col-md-6">
                  <img src="assets/images/icons/contacts.png" width="60" alt="">
                </div>
                <div class="col-lx-8 col-lg-7 col-md-6">
                  <div class="q-mt-lg">
                    <strong class="text-teal-13 menu-title"> مخاطبین</strong>
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
      <lead_histories :lead="lead" v-if="this.$route.name === 'lead_profile_histories'" class="animation-fade-in"></lead_histories>
      <lead_documents :lead="lead" v-if="this.$route.name === 'lead_profile_documents'" class="animation-fade-in"></lead_documents>
      <lead_texts :lead="lead" v-if="this.$route.name === 'lead_profile_texts'" class="animation-fade-in"></lead_texts>
      <lead_campaigns :lead="lead" v-if="this.$route.name === 'lead_profile_campaigns'" class="animation-fade-in"></lead_campaigns>
      <lead_emails :lead="lead" v-if="this.$route.name === 'lead_profile_emails'" class="animation-fade-in"></lead_emails>
      <lead_contacts :lead="lead" v-if="this.$route.name === 'lead_profile_contacts'" class="animation-fade-in"></lead_contacts>

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