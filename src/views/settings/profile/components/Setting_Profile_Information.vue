<script>
export default {
  name: "Setting_Profile_Information"
}
</script>

<template>
  <q-card flat>
    <q-card-section>
     <strong class="font-16 text-pink-8">مشخصات فردی</strong>
      <q-btn  color="blue-9" glossy icon="fas fa-edit q-mr-xs" class="float-right">ویرایش اطلاعات</q-btn>
    </q-card-section>
    <q-separator class="q-mt-sm"/>
    <q-card-section>
      <global_loading_shape :size="60"></global_loading_shape>
    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>