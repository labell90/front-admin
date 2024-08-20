<script>
import {mapActions} from "vuex";
import features from "@/store/modules/features/features.js";

export default {
  name: "Users_Access",
  mounted() {
    this.Get_Features();
    this.Get_User();
  },
  data(){
    return{
      user_loading:true,
      features_loading:true,
      edit_loading:false,
      get_access_loading:true,
      counter:0,
      user : null,
      user_access:[],
      features:[],
      columns:[
        {
          name: 'name',
          required: true,
          label: 'عنوان',
          align: 'left',
          sortable: false,
          field: row => row.name,
        },
        {
          name: 'code',
          required: true,
          label: 'کد',
          align: 'left',
          sortable: false,
          field: row => row.code,
        },
        {
          name: 'read',
          required: true,
          label: 'نمایش',
          align: 'left',
          sortable: false,
        },
        {
          name: 'write',
          required: true,
          label: 'ایجاد',
          align: 'left',
          sortable: false,
        },
        {
          name: 'edit',
          required: true,
          label: 'ویرایش',
          align: 'left',
          sortable: false,
        },
        {
          name: 'delete',
          required: true,
          label: 'حذف',
          align: 'left',
          sortable: false,
        },
        {
          name: 'export',
          required: true,
          label: 'Export',
          align: 'left',
          sortable: false,
        },
        {
          name: 'import',
          required: true,
          label: 'Import',
          align: 'left',
          sortable: false,
        },
        {
          name: 'own',
          required: true,
          label: 'مالکیت',
          align: 'left',
          sortable: false,
        },
      ],
      access_info:[],
    }
  },
  methods:{
    ...mapActions([
        "Module_User_Action_Show",
        "Module_User_Action_Accesses_Index",
        "Module_User_Action_Accesses_Edit",
        "Module_Feature_Action_Index"
    ]),
    Convert_Bool(item){
     return item === 1;

    },
    Get_User(){
      this.Module_User_Action_Show(this.$route.params.id).then(res => {
        this.user = res.data.result;
        this.user_loading=false;
        this.Get_Accesses();

      }).catch(error => {
        return this.Methods_Notify_Error_NotFound();

      })
    },
    Get_Features(){
      this.Module_Feature_Action_Index().then(res => {
        this.features = res.data.result;
        this.features.forEach(feature => {
          this.access_info[feature.name]={
              read : false,
              write : false,
              edit : false,
              delete : false,
              import : false,
              export : false,
              own : false,
          }
        })
        this.features_loading=false;
      }).catch(error => {
        return this.Methods_Notify_Error_Server();
      })
    },
    Edit_Feature(){
      this.edit_loading = true;
      let accesses = [];
      this.features.forEach(feature => {
        accesses.push({
          feature : feature.name,
          access : this.access_info[feature.name]
        })
      })
      this.Module_User_Action_Accesses_Edit({id:this.user.id,access:accesses}).then(res => {
      this.Methods_Notify_Message_Success('سطوح دسترسی کاربر باموفقیت ویرایش شد');
      }).catch(error => {
      })

    },
    Get_Accesses(){
      if (this.user){
        this.Module_User_Action_Accesses_Index({id : this.user.id}).then(res => {
          console.log(res.data.result);
          if (res.data.result){
            res.data.result.forEach(item => {
              this.access_info[item.feature.name]={
                read : this.Convert_Bool(item.read),
                write : this.Convert_Bool(item.write),
                edit : this.Convert_Bool(item.edit),
                delete : this.Convert_Bool(item.delete),
                import : this.Convert_Bool(item.import),
                export : this.Convert_Bool(item.export),
                own : this.Convert_Bool(item.own),
              }
            })
          }
          console.log(this.access_info)
        }).catch(error => {

        })


      }
    }
  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong v-if="user" class="text-grey-10">مدیریت سطوح دسترسی کاربر : <strong class="text-red">{{user.name}}</strong></strong>
      <q-btn :to="{name : 'users_index'}" class="float-right" color="yellow-9" text-color="black" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
    </q-card-section>
    <q-card-section v-if="features_loading" >
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <q-card-section v-else>
      <div class="font-16 font-weight-500 text-teal-8">
        <q-icon name="fas fa-shield-halved" size="35px" color="teal"></q-icon>
        لیست موارد دسترسی
      </div>
      <div class="q-mb-xl">
        <q-btn @click="Edit_Feature" class="float-right" color="teal-6"  glossy icon="fas fa-refresh" label="بروز رسانی دسترسی ها"></q-btn>
      </div>

      <div class="q-mt-md q-mb-md">
        <q-table
            flat
            bordered
            :rows="features"
            table-header-class="text-red-8 font-weight-600 font-14"
            :columns="columns"
            separator="cell"
            row-key="id"
            hide-pagination
            :pagination="{rowsPerPage:1000}"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <strong class="font-14">{{props.row.name}}</strong>
            </q-td>
          </template>
          <template v-slot:body-cell-code="props">
            <q-td :props="props">
              <q-chip size="sm" class="font-12 font-weight-500" color="teal-8" text-color="white">{{props.row.code}}</q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-read="props">

            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].read"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-write="props">
            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].write"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-edit="props">
            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].edit"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-delete="props">
            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].delete"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-export="props">
            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].export"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-import="props">
            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].import"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-own="props">
            <q-td :props="props">
              <q-toggle
                  v-model="access_info[props.row.name].own"
                  checked-icon="fas fa-check"
                  color="green-8"
                  size="40px"
                  unchecked-icon="fas fa-times"
              />
            </q-td>
          </template>



        </q-table>
      </div>

      <div class="q-mb-xl">
        <q-btn @click="Edit_Feature" class="float-right" color="teal-6"  glossy icon="fas fa-refresh" label="بروز رسانی دسترسی ها"></q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>