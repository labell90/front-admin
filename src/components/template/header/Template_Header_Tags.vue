<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Template_Header_Tags",
  mounted() {
    this.Get_Tags();
  },
  data() {
    return {
      tags:[],
    }
  },
  methods: {
    ...mapActions([
        "Module_personal_tags_Most_Uses"
    ]),
    Get_Tags(){
      this.Module_personal_tags_Most_Uses().then(res => {
        this.tags = res.data.result;

      }).catch(error => {


      })



    }

  },

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
        <div class="q-mt-md">
          <div class="q-gutter-xs">
            <global_items_tag_single v-for="tag in tags" :item="tag"></global_items_tag_single>
          </div>
        </div>

      </q-card-section>
    </q-menu>
  </q-btn>
</template>

<style scoped>

</style>