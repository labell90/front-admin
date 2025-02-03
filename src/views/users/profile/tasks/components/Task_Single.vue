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
    <div class="q-mt-md">

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