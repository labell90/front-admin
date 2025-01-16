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
      all_tags:[],
      show_personal_tag:true,
      loading: false,
      search : null
    }
  },
  watch: {
    search(newsearch, oldsearch) {

      if (newsearch.replace(/\s+/g, "").length > 2 && newsearch!==oldsearch) {
       this.Search_Tag()
      }else{
        this.show_personal_tag=true
      }
    }
  },
  methods: {
    ...mapActions([
        "Module_personal_tags_Most_Uses",
        "Module_personal_tags_Both"
    ]),
    Get_Tags(){
      this.Module_personal_tags_Most_Uses().then(res => {
        this.tags = res.data.result;

      }).catch(error => {
       this.Methods_Notify_Error_Server();


      })



    },
    Search_Tag(){
      this.show_personal_tag=false;
      this.loading=true;
      this.Module_personal_tags_Both({name : this.search}).then(res=>{
        this.all_tags = res.data.result;

      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.loading=false;


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
        <q-input dense v-model="search" label="جستجو ..." class="q-mb-sm" @change="Search_Tag"/>
        <div class="q-mt-lg">

          <div v-if="show_personal_tag" class="q-gutter-xs">
            <global_items_tag_single v-for="tag in tags" :item="tag"></global_items_tag_single>
          </div>
          <div v-else>
            <global_loading_shape v-if="loading" size="30"></global_loading_shape>
            <template v-else>
              <template v-if="all_tags.length">
                <div class="q-gutter-xs">
                  <global_items_tag_single v-for="tag in all_tags" :item="tag"></global_items_tag_single>
                </div>
              </template>
              <template v-else>
                <global_images_animation_no_data :size="130"></global_images_animation_no_data>
              </template>

            </template>

          </div>
        </div>

      </q-card-section>
    </q-menu>
  </q-btn>
</template>

<style scoped>

</style>