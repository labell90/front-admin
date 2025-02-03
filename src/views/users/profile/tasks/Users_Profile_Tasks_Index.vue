<script>
import Users_Profile_Tasks_Doing from "@/views/users/profile/tasks/Users_Profile_Tasks_Doing.vue";
import Users_Profile_Tasks_Done from "@/views/users/profile/tasks/Users_Profile_Tasks_Done.vue";
import Users_Profile_Tasks_Mine from "@/views/users/profile/tasks/Users_Profile_Tasks_Mine.vue";
import Users_Profile_Tasks_Team from "@/views/users/profile/tasks/Users_Profile_Tasks_Team.vue";
import Users_Profile_Tasks_Today from "@/views/users/profile/tasks/Users_Profile_Tasks_Today.vue";

export default {
  name: "Users_Profile_Tasks_Index",
  components: {
    "task_doing":Users_Profile_Tasks_Doing,
    "task_done":Users_Profile_Tasks_Done,
    "task_mine":Users_Profile_Tasks_Mine,
    "task_team":Users_Profile_Tasks_Team,
    "task_today":Users_Profile_Tasks_Today
  }
}
</script>

<template>
  <div class="row justify-center"  >

    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >

       <router-link :to="{name:'my_task_doing'}">
         <div class="q-pa-sm rounded-borders glossy-bg row">
         <div class="col-lx-4 col-lg-5 col-md-6">
           <img src="assets/images/icons/task_doing.png" width="60" alt="">
         </div>
         <div class="col-lx-8 col-lg-7 col-md-6">
           <div class="q-mt-lg">
             <strong class=" menu-title"> وظایف در حال انجام</strong>
           </div>
         </div>
       </div>
       </router-link>

    </div>
    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >

     <router-link :to="{name : 'my_task_mine'}">
       <div class="q-pa-sm rounded-borders glossy-bg row">
         <div class="col-lx-4 col-lg-5 col-md-6">
           <img src="assets/images/icons/task_mine.png" width="60" alt="">
         </div>
         <div class="col-lx-8 col-lg-7 col-md-6">
           <div class="q-mt-lg">
             <strong class=" menu-title">وظایف من</strong>
           </div>
         </div>
       </div>
     </router-link>

    </div>
    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >

   <router-link :to="{name : 'my_task_team'}">
     <div class="q-pa-sm rounded-borders glossy-bg row">
       <div class="col-lx-4 col-lg-5 col-md-6">
         <img src="assets/images/icons/task_team.png" width="60" alt="">
       </div>
       <div class="col-lx-8 col-lg-7 col-md-6">
         <div class="q-mt-lg">
           <strong class=" menu-title">وظایف تیم</strong>
         </div>
       </div>
     </div>
   </router-link>

    </div>
    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >

       <router-link :to="{name : 'my_task_today'}">
         <div class="q-pa-sm rounded-borders glossy-bg row">
           <div class="col-lx-4 col-lg-5 col-md-6">
             <img src="assets/images/icons/task_today.png" width="60" alt="">
           </div>
           <div class="col-lx-8 col-lg-7 col-md-6">
             <div class="q-mt-lg">
               <strong class=" menu-title">وظایف امروز</strong>
             </div>
           </div>
         </div>
       </router-link>

    </div>
    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 q-pa-sm" >

    <router-link :to="{name : 'my_task_done'}">
      <div class="q-pa-sm rounded-borders glossy-bg row">
        <div class="col-lx-4 col-lg-5 col-md-6">
          <img src="assets/images/icons/task_done.png" width="60" alt="">
        </div>
        <div class="col-lx-8 col-lg-7 col-md-6">
          <div class="q-mt-lg">
            <strong class=" menu-title">وظایف انجام شده</strong>
          </div>
        </div>
      </div>
    </router-link>

    </div>

  </div>
  <q-separator class="q-mt-sm"/>
  <div class="q-mt-md">
    <task_doing v-if="this.$route.name==='my_task_doing'">

    </task_doing>
    <task_done v-if="this.$route.name==='my_task_done'">

    </task_done>
    <task_mine v-if="this.$route.name==='my_task_mine'">

    </task_mine>
    <task_team v-if="this.$route.name==='my_task_team'">

    </task_team>
    <task_today v-if="this.$route.name==='my_task_today'">

    </task_today>
  </div>

</template>

<style scoped>
.glossy-bg{
  background-color: rgba(27, 26, 26, 0.05);
}

.menu-title{
  font-size: 14px;
  color: #0B0C10;
}

</style>