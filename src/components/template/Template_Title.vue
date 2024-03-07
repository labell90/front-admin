<script>
export default {
  name: "Template_Title"
}
</script>

<template>

  <q-card flat>
    <q-card-section>
      <div class="text-subtitle1 font-weight-600 font-17">
        {{this.$route.meta.title}}
      </div>
      <div class="text-subtitle2 text-grey-8">
        {{this.$route.meta.subtitle}}

      </div>
      <q-separator class="q-mt-md"></q-separator>
    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>