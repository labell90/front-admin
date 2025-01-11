<script>
import {mapActions} from "vuex";

export default {
  name: "Client_Profile_Index",
  mounted() {
    this.Get_Client();
  },
  data(){
    return {
      loading:true,
      client:null,
    }
  },
  methods:{
    ...mapActions([
      "Module_Client_Show"
    ]),
    Get_Client(){
      this.Module_Client_Show(this.$route.params.id).then(response => {
        this.client = response.data.result;
        this.loading = false;
        console.log(this.client);
      }).catch(error => {
        this.Methods_Notify_Error_NotFound();
      })
    }
  }
}
</script>

<template>
  <q-card class="q-mt-md rounded-borders" flat >

    <q-card-section>
      <div class="row">
        <div class="col-lg-1 col-md-2 col-sm-4 col-xs-6 q-pa-xs">
          <img width="100" src="/src/assets/images/icons/lead.png" alt="lead">
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
          <div>
            <strong class="font-16"></strong>
          </div>
          <div class="q-mt-md">
            <strong class="font-16"></strong>
          </div>
          <div class="q-mt-md">
            <strong class="font-16"></strong>
          </div>
          <div class="q-mt-md">
            <q-chip size="sm" class="font-11" label="# بدون تگ" color="deep-orange-8" text-color="white"></q-chip>
            <template>

            </template>
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
          <div>
            <span class="text-black-4 font-14 font-weight-500">کد ملی : </span>
            <strong class="font-15"></strong>
          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">گروه بندی : </span>
            <strong class="font-15"></strong>
          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">کد پستی : </span>
            <strong class="font-15"></strong>
          </div>

        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
          <div>
            <span class="text-black-4 font-14 font-weight-500">کشور : </span>
            <strong class="font-15"></strong>
          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">استان : </span>
            <strong  class="font-15" ></strong>

          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">شهر : </span>
            <strong  class="font-15" ></strong>

          </div>

        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
          <div>
            <span class="text-black-4 font-14 font-weight-500"> آدرس : </span>
            <strong class="font-15"></strong>
          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">شماره تلفن ثابت : </span>
            <strong class="font-15" ></strong>

          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">فکس : </span>
            <strong class="font-15" ></strong>

          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">عنوان شرکت  : </span>
            <strong class="font-15" ></strong>

          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 q-pa-xs">
          <div>
            <span class="text-black-4 font-14 font-weight-500">تلفن شرکت  : </span>
            <strong class="font-15"></strong>

          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">وبسایت شرکت : </span>
            <strong class="font-15"></strong>

          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">آدرس شرکت : </span>
            <strong class="font-15" ></strong>

          </div>
          <div class="q-mt-md">
            <span class="text-black-4 font-14 font-weight-500">توضیحات  : </span>
            <strong class="font-15"></strong>

          </div>
        </div>
      </div>
      <q-separator class="q-mt-md q-mb-md" />
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >

            <div class="q-pa-sm rounded-borders shadow-1 row">
              <div class="col-lx-4 col-lg-5 col-md-5">
                <img src="assets/images/icons/storage.png" width="60" alt="">
              </div>
              <div class="col-lx-8 col-lg-7 col-md-7">
                <div class="q-mt-md">
                  <strong class="text-black-10 menu-title">انبار ها</strong>
                </div>
              </div>
            </div>

        </div>
      </div>




    </q-card-section>

  </q-card>

</template>

<style scoped>

.gray-filter{
  filter: grayscale(100%);
}
.menu-title{
  font-size: 14px;
}

</style>