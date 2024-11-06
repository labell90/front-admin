<script>
export default {
  name: "Leads_Profile_Histories_Item",
  props:['lead','item'],
  data(){
    return {
      detail_dialog : false,

    }
  }
}
</script>

<template>

  <q-card class="bg-grey-3" v-if="item">
    <q-card-section>
      <strong class="text-red-6">
        {{item.title}}
      </strong>
      <q-btn @click="detail_dialog=true" color="teal-7" icon="fas fa-list" label="مشاهده جزئیات" rounded size="sm"  glossy class="float-right font-12"></q-btn>
      <div class="q-mt-sm q-mb-sm">
        <span class="text-grey-8">{{item.description}}</span>
      </div>
      <q-separator/>
      <div class="q-mt-sm">
        <global_items_user :user="item.created_by"></global_items_user>
        <global_filter_date class="float-right" :date="item.created_at"></global_filter_date>
      </div>

      <q-dialog
          v-model="detail_dialog"
          position="top"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <strong class="text-teal-9 font-16">مشاهده جزئیات کامل</strong>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section dir="ltr">
            <div v-for="(detail,detail_key) in item.info" class="q-mb-md">
              <strong class="text-grey-8 font-14">{{detail_key}} : </strong>
              <strong class="text-red-6 font-15">{{detail}}</strong>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn glossy color="dark" label="بستن" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>