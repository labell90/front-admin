<script>
export default {
  name: "Settings_Profile_Main",
  data(){
    return {
      profile_tab :"info",
    }
  }
}
</script>

<template>
  <q-card bordered class="bg-grey-3" >
    <q-card-section>
      <div class="row q-mb-md">
        <div class="col-md-1">
          <q-avatar rounded size="120px">
            <img src="assets/images/icons/profile.png" alt="">
          </q-avatar>
        </div>
        <div class="col-md-11 q-pl-md">
          <div>
            <strong class="font-18">مهدی کرد</strong>
          </div>
          <div class="q-mt-sm">
            <div>
              <q-icon name="fas fa-envelope font-18 text-indigo"></q-icon>
              <span class="q-ml-sm text-grey-10">mehdi.kord171@gmail.com</span>
            </div>
            <div class="q-mt-sm">
              <q-icon name="fas fa-mobile font-18 text-indigo"></q-icon>
              <span class="q-ml-sm text-grey-10">09117906950</span>
            </div>


          </div>
        </div>
      </div>
      <q-tabs
          v-model="profile_tab"
          align="justify"
          active-class="bg-pink-14 text-white"
      >
        <q-tab name="information" class="rounded-borders">
          <strong class="font-16">مشخصات</strong>
        </q-tab>
        <q-tab name="logs" class="rounded-borders">
          <strong class="font-16">فعالیت ها</strong>
        </q-tab>
        <q-tab name="security" class="rounded-borders" >
          <strong class="font-16">امنیت</strong>
        </q-tab>


      </q-tabs>

    </q-card-section>
  </q-card>

</template>

<style scoped>
.main-info-bg{
  background-color: #212121;
}
</style>