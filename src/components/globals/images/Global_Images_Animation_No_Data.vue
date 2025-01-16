<script>
export default {
  name: "Global_Images_Animation_No_Data",
  props:["size"],
  mounted() {
    if(this.size){
      this.final_size=this.size
    }
  },
  data(){
    return {
      final_size:260,
    }
  }
}
</script>

<template>
  <div class="text-center q-mt-md q-mb-md">
    <img src="assets/images/animations/no-data.svg" :width="final_size" alt="">
    <div>
      <strong class="text-red-7">هیچ داده ای برای نمایش یافت نشد !</strong>
    </div>
  </div>
</template>

<style scoped>

</style>