<script>
import Task_Single from "@/views/users/profile/tasks/components/Task_Single.vue";

export default {
  name: "Users_Profile_Tasks_Doing",
components: {
    "task_single" : Task_Single
}
}
</script>

<template>
  <q-card flat>
    <q-card-section>
      <strong class="text-red-7 font-15">
        وظایف در حال انجام
      </strong>
      <div class="q-mt-lg row">
        <div v-for="i in 4" class="col-md-4 q-px-sm q-mb-md animation-fade-in">

          <task_single></task_single>

        </div>


      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>