<script>
export default {
  name: "Settings_Profile_Main",
  data(){
    return {

    }
  }
}
</script>

<template>
  <q-card bordered class="" >
    <q-card-section>
      <div class="row q-mb-md animation-fade-in">
        <div class="col-md-1">
          <q-avatar rounded size="100px">
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
      <q-separator/>
      <div class="q-mt-sm">
        <div class="row justify-center">
          <div class="q-px-sm col-xs-6 col-sm-6 col-md-3">

            <q-card flat :class="{'bg-pink-6' : this.$route.name === 'setting_profile_information_edit' || this.$route.name === 'setting_profile_information' , 'bg-grey-5' : this.$route.name !== 'setting_profile_information' && this.$route.name !== 'setting_profile_information_edit'}">
              <router-link :to="{name : 'setting_profile_information'}">
                <q-card-section class="text-center">
                    <strong class="font-15" :class="{'text-white' : this.$route.name === 'setting_profile_information' || this.$route.name === 'setting_profile_information_edit', 'text-dark' : this.$route.name !== 'setting_profile_information'}">مشخصات فردی</strong>
                </q-card-section>
              </router-link>
            </q-card>
          </div>
          <div class="q-px-sm col-xs-6 col-sm-6 col-md-3">
            <q-card flat :class="{'bg-pink-6' : this.$route.name === 'setting_profile_security' , 'bg-grey-5' : this.$route.name !== 'setting_profile_security'}">
              <router-link :to="{name : 'setting_profile_security'}">
                <q-card-section class="text-center">
                  <strong class="font-15" :class="{'text-white' : this.$route.name === 'setting_profile_security' , 'text-dark' : this.$route.name !== 'setting_profile_security'}">امنیت</strong>
                </q-card-section>
              </router-link>
            </q-card>

          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <router-view></router-view>
      </div>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>