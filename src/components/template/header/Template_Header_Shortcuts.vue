<script>
import {mapGetters} from "vuex";

export default {
  name: "Template_Header_Shortcuts",
  data(){
    return {

    }
  },
  methods:{


  },
  mounted() {
  }

}
</script>

<template>
  <q-btn  title="د‍سترسی سریع" round >
    <q-avatar rounded size="25px">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="grid-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-grid-2 fa-lg"><path fill="currentColor" d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z" class=""></path></svg>

    </q-avatar>
    <q-menu
        transition-show="flip-right"
        transition-hide="flip-left"
         style="width: 360px">
      <q-card-section>
        <div class="row text-center">
          <div class="col-md-4 col-sm-6 col-xs-6">
            <q-btn color="primary" flat icon="fas fa-envelope-open-text" round size="lg" title="صندوق ورودی"></q-btn>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-6">
            <q-btn color="orange-8" flat icon="fas fa-paper-plane" round size="lg" title="ارسالی ها"></q-btn>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-6">
            <q-btn color="green-8" flat icon="fas fa-list-check" round size="lg" title="کار ها"></q-btn>
          </div>

        </div>

      </q-card-section>
    </q-menu>
  </q-btn>
</template>

<style scoped>

</style>