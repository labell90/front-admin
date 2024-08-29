<script>
import {mapActions} from "vuex";
import features from "@/store/modules/features/features.js";

export default {
  name: "Users_Access",
  mounted() {
    this.Get_Features();
    this.Get_Role();
  },
  data(){
    return{
      user_loading:true,
      features_loading:true,
      edit_loading:false,
      get_access_loading:true,
      counter:0,
      role : null,
      role_access:[],
      features:[],
      columns:[
        {
          name: 'name',
          required: true,
          label: 'عنوان',
          align: 'left',
          sortable: false,
          field: row => row.name_fa,
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
      access_row_all:[],
      access_column_all:[],
      access_full:false,
    }
  },
  methods:{
    ...mapActions([
      "Module_Role_Action_Show",
      "Module_Role_Action_Accesses_Index",
      "Module_Role_Action_Accesses_Edit",
      "Module_Feature_Action_Index"
    ]),
    Convert_Bool(item){
      return item === 1;

    },
    Get_Role(){
      this.Module_Role_Action_Show(this.$route.params.id).then(res => {
        this.role = res.data.result;
        this.role_loading=false;
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
      this.Module_Role_Action_Accesses_Edit({id:this.role.id,access:accesses}).then(res => {
        this.Methods_Notify_Message_Success('سطوح دسترسی نقش باموفقیت ویرایش شد');
      }).catch(error => {
      })

    },
    Get_Accesses(){
      if (this.role){
        this.Module_Role_Action_Accesses_Index({id : this.role.id}).then(res => {
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
              this.access_row_all[item.feature.name]=false;

            })
            this.access_column_all['read']=false;
            this.access_column_all['write']=false;
            this.access_column_all['edit']=false;
            this.access_column_all['delete']=false;
            this.access_column_all['import']=false;
            this.access_column_all['export']=false;
            this.access_column_all['own']=false;
          }
        }).catch(error => {

        })


      }
    },
    Change_All_Access(name){
      this.access_info[name].read = this.access_row_all[name];
      this.access_info[name].write = this.access_row_all[name];
      this.access_info[name].edit = this.access_row_all[name];
      this.access_info[name].delete = this.access_row_all[name];
      this.access_info[name].import = this.access_row_all[name];
      this.access_info[name].export = this.access_row_all[name];
      this.access_info[name].own = this.access_row_all[name];
    },
    Change_All_Column_Access(header){
      this.features.forEach(feature => {
        if (header === 'read'){
          this.access_info[feature.name].read = this.access_column_all['read'];
        }
        if (header === 'write'){
          this.access_info[feature.name].write = this.access_column_all['write'];
        }
        if (header === 'edit'){
          this.access_info[feature.name].edit = this.access_column_all['edit'];
        }
        if (header === 'delete'){
          this.access_info[feature.name].delete = this.access_column_all['delete'];
        }
        if (header === 'import'){
          this.access_info[feature.name].import = this.access_column_all['import'];
        }
        if (header === 'export'){
          this.access_info[feature.name].export = this.access_column_all['export'];
        }
        if (header === 'own'){
          this.access_info[feature.name].own = this.access_column_all['own'];
        }
      })


    },
    Change_Full_Access(){
      this.features.forEach(feature => {
        this.access_info[feature.name].read = this.access_full;
        this.access_info[feature.name].write = this.access_full;
        this.access_info[feature.name].edit = this.access_full;
        this.access_info[feature.name].delete = this.access_full;
        this.access_info[feature.name].import = this.access_full;
        this.access_info[feature.name].export = this.access_full;
        this.access_info[feature.name].own = this.access_full;
      })
      this.Methods_Notify_Message_Success("انجام شد !")
    }
  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong v-if="role" class="text-grey-10">مدیریت سطوح دسترسی نقش : <strong class="text-red">{{role.name}}</strong></strong>
      <q-btn :to="{name : 'roles_index'}" class="float-right" color="yellow-9" text-color="black" glossy icon="fas fa-arrow-left" label="بازگشت"></q-btn>
    </q-card-section>
    <q-card-section v-if="features_loading" >
      <global_loading_shape size="90"></global_loading_shape>
    </q-card-section>
    <q-card-section v-else>
      <div class="font-16 font-weight-500 text-teal-8">
        <q-icon name="fas fa-shield-halved" size="35px" color="teal"></q-icon>
        لیست موارد دسترسی
      </div>
      <div class="q-mt-md">
        <q-checkbox
            v-model="access_full"
            @click="Change_Full_Access"
            title="فعال سازی همه "
            color="deep-orange-7"
            class="text-deep-orange-8 font-weight-600"
            label="فعال سازی همه دسترسی ها"
            size="40px"
        />
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
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
              >
                {{ col.label }}

                <q-checkbox
                    v-if="col.name !== 'code' && col.name !== 'name' "
                    v-model="access_column_all[col.name]"
                    @click="Change_All_Column_Access(col.name)"
                    title="اعمال برای همه"
                    color="blue-7"
                />
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <strong class="font-14">{{props.row.name_fa}}</strong>
              <q-checkbox
                  v-model="access_row_all[props.row.name]"
                  @click="Change_All_Access(props.row.name)"
                  class="float-right"
                  title="اعمال برای همه"
                  color="red-7"

              />

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