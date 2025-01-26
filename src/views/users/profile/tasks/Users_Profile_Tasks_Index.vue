<script>
export default {
  name: "Users_Profile_Tasks_Index"
}
</script>

<template>
  <div class="row"  >

    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >
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

</template>

<style scoped>

</style>