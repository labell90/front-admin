<script>
//#TODO Show full and short date by click
export default {
  name: "Global_Filter_Date_Start",
  props:['date'],
  data(){
    return{
      show:false,
      final_date : null
    }
  },
  created() {
    this.final_date = this.$filters.date_jalali(this.date,"jYYYY/jM/jD");
  },
  methods:{
    Change(){
      this.show = !this.show;
      if (this.show){
        this.final_date = this.$filters.date_jalali(this.date);
      }else {
        this.final_date = this.$filters.date_jalali(this.date,"jYYYY/jM/jD")
      }


    }
  },
}
</script>

<template>
<!--  <q-btn color="blue" label="test" @click="Change"></q-btn>-->
  <q-chip v-if="final_date" dir="ltr" color="green-7" text-color="white" size="sm" class="cursor-pointer">
    <span @click="Change">{{final_date}}</span>
  </q-chip>
</template>

<style scoped>
.create{
  font-size: 11px;
  font-weight: 450;
}
</style>