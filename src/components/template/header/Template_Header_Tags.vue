<script>
import {mapGetters} from "vuex";

export default {
  name: "Template_Header_Tags",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }

}
</script>

<template>
  <q-btn title="تگ های پر کاربرد" round>
    <q-avatar rounded size="25px">
     <q-icon name="fas fa-tag"></q-icon>
    </q-avatar>
    <q-menu
        transition-show="flip-right"
        transition-hide="flip-left"
        style="width: 360px">
      <q-card-section>
        <strong class="text-red">تگ های پر کاربرد</strong>


      </q-card-section>
    </q-menu>
  </q-btn>
</template>

<style scoped>

</style>