<script>
export default {
  name: "Global_Item_Extra_Fields",
  props:['forms','row_classes'],
  data(){
    return {
      fields:[],
    }
  },
  methods:{
    Get_Fields(){
      return this.fields;
    }
  }
}
</script>

<template>

  <div v-for="field in forms" :class="'q-px-sm ' + row_classes">
      <template v-if="field.form">
        <template v-if="field.form.type !== 'select' && field.form.type !== 'checkbox'">
          <q-input   outlined v-model="fields[field.form.id]"  :type="field.form.type" :label="field.form.title">

          </q-input>
        </template>

      </template>
    </div>

</template>

<style scoped>

</style>