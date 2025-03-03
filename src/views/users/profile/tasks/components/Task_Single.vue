<script>
export default {
  name: "Task_Single",
  props: ['task']
}
</script>

<template>
  <div class="task-box">
    <strong>وظیفه تستی است</strong>
    <span class="float-right q-mr-sm">
      <q-avatar
                  v-for="n in 5"
                  :key="n"
                  size="40px"
                  class="overlapping float-right"
                  :style="`right: ${n * 12}px`"
              >
                <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
              </q-avatar>
    </span>
    <q-separator class="q-mt-lg"/>
    <div class="q-mt-md">
      <div class="row">
        <div class="col-6">
          <span class="text-grey-8 font-13">نوع : </span>
          <strong class="text-dark font-13">وظیفه مهم</strong>
        </div>
        <div class="col-6 text-center">
          <span class="text-grey-8 font-13">وضعیت : </span>
          <strong class="text-blue-8 font-13">درحال انجام</strong>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-6">
          <span class="text-grey-8 font-13">ت شروع : </span>
          <strong class="text-green-8 font-13">11/01/1404</strong>
        </div>
        <div class="col-6 text-center">
          <span class="text-grey-8 font-13">ت پایان : </span>
          <strong class="text-red-8 font-13">16/01/1404</strong>
        </div>
      </div>
      <div class="q-mt-md">
        <span class="text-grey-8 font-13">توضیحات : </span>
        <strong class="text-grey-10 font-13">توضیحات مربوط به تسک مورد نظر</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-box{
  background-color: rgba(66, 126, 126, 0.11);
  border-radius: 6px;
  padding: 15px 10px;
}
</style>