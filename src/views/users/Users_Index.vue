<script>
import {mapActions} from "vuex";
import Global_Item_User_Group from "@/components/globals/items/Global_Item_User_Group.vue";
import Global_Item_User_Role from "@/components/globals/items/Global_Item_User_Role.vue";

export default {
  name: "Users_Index",
  components:{
    'user_group' : Global_Item_User_Group,
    'user_role' : Global_Item_User_Role
  },
  mounted() {
    this.Items_Get();
    this.Group_Get();
    this.Searchable_Get();
    this.Columns_Generate();
    this.Roles_Get();
  },
  data(){
    return {
      items:[],
      searchable:[],
      query_params:{
        sort_by : 'id',
        sort_type : 'desc',
        search :{}
      },
      items_loading:true,
      delete_loading:false,
      activation_loading:false,
      groups:[],
      roles:[],
      items_selected:[],
      selected: [],
      pagination: {
        sortBy : 'id',
        descending:true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      },
      columns : [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true,
          field: row => '# ' + row.id,
        },
        {
          name: 'name',
          value: 'name',
          label: 'نام',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'phone',
          value: 'phone',
          label: 'موبایل',
          align: 'left',
          sortable: false,
          field: row => row.phone,
        },
        {
          name: 'email',
          value: 'email',
          label: 'ایمیل',
          align: 'left',
          sortable: false,
          field: row => row.email,
        },
        {
          name: 'role',
          value: 'role',
          label: 'نقش',
          align: 'left',
          sortable: false,
          field: row => row.role,
        },
        {
          name: 'group',
          value: 'group',
          label: 'گروه',
          align: 'left',
          sortable: false,
          field: row => row.group,
        },
        {
          name: 'is_active',
          value: 'is_active',
          label: 'وضعیت',
          align: 'left',
          sortable: true,
          field: row => row.is_active,
        },
        {
          name: 'location',
          value: 'location',
          label: 'مکان',
          align: 'left',
          sortable: false,
        },
        {
          name: 'created_at',
          value: 'created_at',
          label: 'ت ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_at,
        },
        {
          name: 'updated_at',
          value: 'updated_at',
          label: 'ت ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_at,
        },
        {
          name: 'tools',
          value: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ],
      visible_columns:[],
      tags_dialog:[]
    }
  },
  methods :{
    ...mapActions([
      "Module_User_Action_Index",
      "Module_User_Action_Delete",
      "Module_Group_Action_Index",
      "Module_User_Action_Activation",
      "Module_User_Action_Searchable",
      "Module_Role_Action_All"
    ]),
    Items_Get(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_User_Action_Index({per_page:per_page,page:page,params:this.query_params}).then(res => {
        this.items = res.data.result.data;
        this.pagination.page = res.data.result.current_page;
        this.pagination.rowsPerPage = res.data.result.per_page;
        this.pagination.rowsNumber = res.data.result.total;
        this.items_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })
    },
    Group_Get(){
      this.Module_Group_Action_Index({per_page : 100000}).then(res => {
        this.groups = res.data.result.data;
      })
    },
    Searchable_Get(){
      this.Module_User_Action_Searchable().then(res => {
        this.searchable = res.data.result
      })
    },
    Item_Delete(id){
      this.delete_loading=true;
      this.Module_User_Action_Delete(id).then(res => {
        this.items = this.items.filter(item => {
          return item.id !== id;
        })
        this.Methods_Notify_Delete();
        this.delete_loading=false;
      }).catch(error => {
        if (error.response.status === 409) {
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.delete_loading=false;

      })

    },
    Item_Activation(id){
      this.activation_loading=true;
      this.Module_User_Action_Activation(id).then(res => {
        this.items = this.items.filter(item => {
          if (item.id === id){
            item.is_active = !item.is_active;
          }
          return item;
        })
        this.activation_loading=false;
      }).catch(error =>{
        if (error.response.status === 409) {
         this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
        }
        this.activation_loading=false;
      })

    },
    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },
    Items_OnRequest(props){
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      let sort_type;
      this.pagination.sortBy = sortBy
      if (page === this.pagination.page && rowsPerPage === this.pagination.rowsPerPage){
        this.pagination.descending = !this.pagination.descending
      }
      if (this.pagination.descending){
        sort_type = "desc"
      }else {
        sort_type = "asc"
      }
      this.query_params.sort_by = sortBy;
      this.query_params.sort_type = sort_type;
      this.Items_Get(rowsPerPage,page);

    },
    Items_Search(data){
      this.query_params.search = data;
      this.Items_Get()
    },
    Columns_Generate(){
      this.columns.forEach(item => {
        if (item.value){
          this.visible_columns.push(item.value)
        }
      })
    },
    Roles_Get(){
      this.Module_Role_Action_All().then(res => {
        this.roles = res.data.result;
        console.log(this.roles);
      }).catch(error => {

      })
    }
  }

}
</script>

<template>
  <q-card>
    <q-card-section>
      <global_actions_header_buttons :create="true" :archive="true" route="users"></global_actions_header_buttons>
      <q-separator class="q-mt-xl"/>
      <div class="q-mt-md">
        <strong class="text-teal-8">جستجو و فیلتر پیشترفته</strong>
       <div class="q-mt-sm">
         <global_searching_full_search @Search="(data) => Items_Search(data)" v-if="searchable.length" :items="searchable" ></global_searching_full_search>
       </div>
        <q-banner dense class="bg-indigo rounded-borders">
          <q-icon name="fas fa-info-circle fa-spin" color="white" size="30px"/>
          <span class="text-white q-ml-sm">
            برای مشاهده و ویرایش گروه کاربر ، روی دکمه مورد نظر در قسمت گروه جدول کلیک کنید
          </span>
        </q-banner>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-mb-sm">
        <q-select
            outlined
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="visible_columns"
            label="موارد قابل مشاهده"
            :options="columns"
            emit-value
            map-options
            multiple
            behavior="dialog"
            use-chips
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>
         
        </q-select>
      </div>
      <q-table
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title="لیست آیتم ها"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          :visible-columns="visible_columns"
          separator="cell"
          selection="multiple"
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
          v-model:pagination="pagination"
          @request="Items_OnRequest"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
<!--            #TODO create image viewer and show user image-->
            <div class="row">
                <img src="assets/images/icons/user-default.png" width="35"  alt="user_profile"/>
                <div class="q-ml-sm q-mt-sm"><strong>{{ props.row.name }}</strong></div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
              <global_actions_activation_item @Set_Ok="Item_Activation(props.row.id)" :status="props.row.is_active"></global_actions_activation_item>
          </q-td>
        </template>
        <template v-slot:body-cell-location="props">
          <q-td :props="props">
            <span v-if="props.row.country">
              {{ props.row.country }}
              /
            </span>
            <span v-if="props.row.province">
              {{ props.row.province }}
              /
            </span>
            <span v-if="props.row.city">
              {{ props.row.city }}

            </span>
          </q-td>
        </template>
        <template v-slot:body-cell-role="props">
          <q-td :props="props">
            <user_role :user="props.row" :roles="roles" @Done="Items_Get"></user_role>
          </q-td>
        </template>
        <template v-slot:body-cell-group="props">
          <q-td :props="props">
            <user_group :user="props.row" :groups="groups" @Done="Items_Get"></user_group>
          </q-td>
        </template>
        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn :to="{name:'users_access',params:{id:props.row.id}}" glossy title="مدیریت دسترسی" class="q-ma-xs" color="green-8" icon="fas fa-shield-halved" size="9px" round  />
              <q-btn :to="{name:'users_profile',params:{id:props.row.id}}" glossy title="پروفایل" class="q-ma-xs" color="deep-orange-6" icon="fas fa-user" size="9px" round  />
              <q-btn :to="{name:'users_edit',params:{id:props.row.id}}" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <q-btn @click="tags_dialog[props.row.id]=true"  glossy title=" تگ ها" class="q-ma-xs" color="orange-8" icon="fas fa-tag" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
              <q-dialog
                  v-model="tags_dialog[props.row.id]"
                  position="top"
              >
                <q-card style="width: 960px; max-width: 80vw;">
                  <q-card-section>
                    <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm"/>
                    <strong class="font-15">ویرایش تگ های کاربر</strong>
                  </q-card-section>
                  <q-separator/>
                  <q-card-section>
                    <global_tags ></global_tags>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>

          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props" >
            <global_filter_date :date="props.row.created_at" />
          </q-td>
        </template>
        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props" >
            <global_filter_date :date="props.row.updated_at" />
          </q-td>
        </template>


      </q-table>
    </q-card-section>

  </q-card>
</template>

<style scoped>

</style>