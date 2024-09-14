<script>
export default {
  name: "Leads_Profile_Documents_Item",
  props:['lead','document']
}
</script>

<template>

  <q-card class="bg-grey-4 shadow-8">
    <q-card-section>
      <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <div class="q-mb-sm">
            <strong class="text-grey-8">عنوان سند : </strong>
            <strong class="text-red">{{document.title}} </strong>
          </div>
          <div class="q-mb-sm">
            <strong class="text-grey-8">توسط : </strong>
            <strong class="text-red"><global_items_user :user="document.created_by"></global_items_user> </strong>
          </div>
          <div class="q-mb-md">
            <strong class="text-grey-8">تاریخ : </strong>
            <strong class="text-red"><global_filter_date :date="document.updated_at"></global_filter_date> </strong>
          </div>
          <div class="q-mb-sm">
            <strong class="text-grey-8">توضیحات : </strong>
            <strong class="text-red">{{document.description}}</strong>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <div class="text-right q-mb-md">
            <q-btn glossy color="green-8" icon="fas fa-download" label="دریافت فایل سند"></q-btn>
          </div>
          <div class="text-right q-mb-sm" dir="ltr">
            <strong class="text-grey-7">File name : </strong>
            <strong class="text-indigo">{{document.file_name}}</strong>
          </div>
          <div class="text-right q-mb-sm" dir="ltr">
            <strong class="text-grey-7">File size : </strong>
            <strong class="text-dark">{{this.$filters.file_size(document.file_size)}}</strong>
          </div>
          <div class="text-right q-mb-sm" dir="ltr">
            <strong class="text-grey-7">File type : </strong>
            <strong class="text-indigo">{{document.file_size}}</strong>
          </div>
        </div>
      </div>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>