<script>
import {mapActions} from "vuex";
import role from "@/store/modules/role/role.js";

export default {
  name: "Features_Index",
  mounted() {
    this.Items_Get();
  },
  data(){
    return {
      items:[],
      items_loading:true,
      items_selected:[],
      access_role : null,
      access_role_loading:null,
      delete_role_loading : [],

      access_user : null,
      access_user_loading:null,
      delete_user_loading : [],

      selected: [],
      dialog_role : [],
      dialog_user : [],
      pagination: {
        page: 1,
        rowsPerPage: 10000,
      },
      columns : [
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
          name: 'roles',
          required: true,
          label: 'نقش های متصل',
          align: 'left',
          sortable: false,
          field: row => row,
        },
        {
          name: 'users',
          required: true,
          label: 'کابران متصل',
          align: 'left',
          sortable: false,
          field: row => row,
        },


      ],
      role_columns : [
        {
          name: 'name',
          required: true,
          label: 'عنوان',
          align: 'left',
          sortable: false,
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
        {
          name: 'created_by',
          required: true,
          label: 'آخرین ویرایش',
          align: 'left',
          sortable: false,
        },
        {
          name: 'tool',
          required: true,
          label: 'حذف',
          align: 'left',
          sortable: false,
        },
      ],
      user_columns : [
        {
          name: 'name',
          required: true,
          label: 'کاربر',
          align: 'left',
          sortable: false,
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
        {
          name: 'created_by',
          required: true,
          label: 'آخرین ویرایش',
          align: 'left',
          sortable: false,
        },
        {
          name: 'tool',
          required: true,
          label: 'حذف',
          align: 'left',
          sortable: false,
        },
      ],



    }
  },
  methods :{
    ...mapActions([
        "Module_Feature_Action_Index_All",
        "Module_Feature_Action_Access_Role",
        "Module_Feature_Action_Access_Role_Delete",
        "Module_Feature_Action_Access_User",
        "Module_Feature_Action_Access_User_Delete"
    ]),

    Items_Get(){
      this.Module_Feature_Action_Index_All().then(res => {
        this.items = res.data.result;
        this.items_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })
    },
    Get_Access_Role(feature){
      this.access_role_loading = true
      this.Module_Feature_Action_Access_Role(feature).then(res => {
        this.access_role = res.data.result;
        this.access_role_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();

      })
    },
    Delete_Role_Access(id){
      this.delete_role_loading[id] = true;
      this.Module_Feature_Action_Access_Role_Delete(id).then(res => {
        this. access_role = this.access_role.filter(item => {return item.id !== id})
        this.delete_role_loading[id] = false;
        this.Methods_Notify_Delete();
      }).catch(error =>{
        this.Methods_Notify_Error_Server();

        this.delete_role_loading[id] = false;

      })


    },

    Get_Access_User(feature){
      this.access_user_loading = true
      this.Module_Feature_Action_Access_User(feature).then(res => {
        this.access_user = res.data.result;
        this.access_user_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();

      })
    },
    Delete_User_Access(id){
      this.delete_user_loading[id] = true;
      this.Module_Feature_Action_Access_User_Delete(id).then(res => {
        this. access_user = this.access_user.filter(item => {return item.id !== id})
        this.delete_user_loading[id] = false;
        this.Methods_Notify_Delete();
      }).catch(error =>{
        this.Methods_Notify_Error_Server();
        this.delete_user_loading[id] = false;

      })


    },

    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },



  }
}
</script>

<template>
  <q-card>
    <q-banner dense class="bg-teal-7 rounded-borders">
      <q-icon name="fas fa-info-circle fa-spin" color="white" size="30px"/>
      <span class="text-white q-ml-sm font-weight-600">
            برای مشاهده و ویرایش دسترسی های متصل به نقش ها و کاربران میتوانید روی دکمه مورد نظر در جدول کلیک کنید
      </span>
    </q-banner>
    <q-card-section>
      <strong class="text-grey-10">جستجو و فیلتر پیشترفته</strong>
    </q-card-section>
    <q-card-section>
      <q-table
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title="لیست آیتم ها"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          separator="cell"
          selection="multiple"
          hide-pagination
          v-model:pagination="pagination"
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
      >

        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <strong>{{props.row.name_fa}}</strong>
          </q-td>
        </template>
        <template v-slot:body-cell-code="props">
          <q-td :props="props">
            <q-chip color="blue-7" text-color="white" class="font-12">
              <strong>{{props.row.code}}</strong>
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-roles="props">
          <q-td :props="props">
            <q-btn @click="Get_Access_Role(props.row.id);dialog_role[props.row.name] = true" size="md" class="font-12 rounded-borders" color="dark"><strong class="text-yellow-6 q-mr-xs font-16">{{props.row.roles_count}}</strong> <span>نقش متصل</span></q-btn>
            <q-dialog
                v-model="dialog_role[props.row.name]"
                position="top"
            >
              <q-card style="width: 85%; max-width: 90vw;">
                <q-card-section>
                  <strong>نقش های متصل به ویژگی (بخش) : </strong>
                  <strong class="text-red font-16">{{props.row.name_fa}}</strong>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <global_loading_shape v-if="access_role_loading"></global_loading_shape>
                  <template v-else>
                    <template v-if="!access_role.length">
                      <global_images_animation_no_data></global_images_animation_no_data>
                    </template>
                    <template v-else>
                      <div class="q-mt-md">
                        <q-table
                            flat
                            bordered
                            :loading="items_loading"
                            :rows="access_role"
                            title="لیست نقش های مرتبط"
                            title-class="text-teal-8 font-18 font-weight-500"
                            table-header-class="text-red-8"
                            :columns="role_columns"
                            separator="cell"
                            hide-pagination
                            v-model:pagination="pagination"
                            row-key="id"
                        >
                          <template v-slot:body-cell-name="props">
                            <q-td :props="props">
                              <strong>{{props.row.role.name}}</strong>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-read="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.read"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-write="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.write"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-edit="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.edit"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-delete="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.delete"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-export="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.export"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-import="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.import"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-own="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.own"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-created_by="props">
                            <q-td :props="props">
                              <global_items_user :user="props.row.created_by" />

                            </q-td>
                          </template>
                          <template v-slot:body-cell-tool="props">
                            <q-td :props="props">
                              <q-btn :to="{name : 'roles_access',params : {id : props.row.role.id}}" glossy title="ویرایش سطح دسترسی" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
                              <global_actions_delete_item @Set_Ok="Delete_Role_Access(props.row.id)" :loading="delete_role_loading[props.row.id]"></global_actions_delete_item>
                            </q-td>
                          </template>




                        </q-table>
                      </div>
                    </template>
                  </template>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn glossy label="بستن" color="red" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

          </q-td>
        </template>
        <template v-slot:body-cell-users="props">
          <q-td :props="props">
            <q-btn @click="Get_Access_User(props.row.id);dialog_user[props.row.name] = true" size="md" class="font-12 rounded-borders" color="indigo-7"><strong class="text-yellow-6 q-mr-xs font-16">{{props.row.users_count}}</strong> <span>کاربر متصل</span></q-btn>
            <q-dialog
                v-model="dialog_user[props.row.name]"
                position="top"
            >
              <q-card style="width: 85%; max-width: 90vw;">
                <q-card-section>
                  <strong>کابران متصل به ویژگی (بخش) : </strong>
                  <strong class="text-red font-16">{{props.row.name_fa}}</strong>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <global_loading_shape v-if="access_user_loading"></global_loading_shape>
                  <template v-else>
                    <template v-if="!access_user.length">
                      <global_images_animation_no_data></global_images_animation_no_data>
                    </template>
                    <template v-else>
                      <div class="q-mt-md">
                        <q-table
                            flat
                            bordered
                            :loading="items_loading"
                            :rows="access_user"
                            title="لیست نقش های مرتبط"
                            title-class="text-teal-8 font-18 font-weight-500"
                            table-header-class="text-red-8"
                            :columns="user_columns"
                            separator="cell"
                            hide-pagination
                            v-model:pagination="pagination"
                            row-key="id"
                        >
                          <template v-slot:body-cell-name="props">
                            <q-td :props="props">
                              <global_items_user :user="props.row.user"></global_items_user>

                            </q-td>
                          </template>
                          <template v-slot:body-cell-read="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.read"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-write="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.write"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-edit="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.edit"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-delete="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.delete"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-export="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.export"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-import="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.import"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-own="props">
                            <q-td :props="props">
                              <global_chips_bool_status :status="props.row.own"></global_chips_bool_status>
                            </q-td>
                          </template>
                          <template v-slot:body-cell-created_by="props">
                            <q-td :props="props">
                              <global_items_user :user="props.row.created_by" />

                            </q-td>
                          </template>
                          <template v-slot:body-cell-tool="props">
                            <q-td :props="props">
                              <q-btn :to="{name : 'users_access',params : {id : props.row.user.id}}" glossy title="ویرایش سطح دسترسی" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
                              <global_actions_delete_item @Set_Ok="Delete_User_Access(props.row.id)" :loading="delete_user_loading[props.row.id]"></global_actions_delete_item>
                            </q-td>
                          </template>




                        </q-table>
                      </div>
                    </template>
                  </template>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn glossy label="بستن" color="red" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

          </q-td>
        </template>

      </q-table>
    </q-card-section>

  </q-card>

</template>

<style scoped>

</style>