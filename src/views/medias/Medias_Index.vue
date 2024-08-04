<script>
import {mapActions} from "vuex";
import Medias_Folders_Item_Grid from "@/views/medias/components/Medias_Folders_Item_Grid.vue";
import Medias_Breadcrumb from "@/views/medias/components/Medias_Breadcrumb.vue";

export default {
  name: "Medias_Index",
  components:{
    'folder_item_grid' : Medias_Folders_Item_Grid,
    'media_breadcrumb' : Medias_Breadcrumb,
  },
  mounted() {
    this.Get_Folders();
  },
  data(){
    return {
      dialog_add_file:false,
      dialog_add_folder:false,
      options:{
        types:[
          {
            label : "تاریخ ایجاد",
            value : "created_at",
          },
          {
            label : "الفبا",
            value : "name"
          },
          {
            label : "حجم فایل",
            value : "size"
          },
          {
            label : "تعداد استفاده",
            value : "use_count"
          }
        ],
        sorts:[
            {
                label : "صعودی",
                value : "asc"
            },
            {
                label : "نزولی",
                value : "desc"
            }
        ]
      },
      sort_by:"created_at",
      sort_type:"desc",
      folders:[],
      folders_loading:true,
      folders_parent:null,
      folders_current:null,
      add_folder:{
        name:null,
        parent_id:null,
        description:null,
        password:null,
      },
      add_media:{
        title:null,
        media:null,
        password: null,
        folder_id:null
      },
      add_media_loading:false,
      add_folder_loading:false,
      editing_folder:{
        id:null,
        status:false,
      },
      errors:[]

    }
  },
  methods:{
    ...mapActions([
      "Module_Folders_Action_Index",
      "Module_Folders_Action_Create",
      "Module_Media_Action_Create",
    ]),

    Get_Folders(per_page,page){
      if (!per_page){
        per_page = '';
      }
      if (!page){
        page = '';
      }
      this.Module_Folders_Action_Index({per_page:per_page,page:page,parent_id:this.folders_parent}).then(response => {
        this.folders = response.data.result;
        this.folders_loading=false;
      }).catch(error => {
        this.folders_loading=false;
        this.Methods_Notify_Error_Server();
      })

    },
    Create_Folder(){
      this.add_folder_loading=true;
     this.add_folder.parent_id = this.folders_parent;
     this.Module_Folders_Action_Create(this.add_folder).then(response => {
       this.folders.push(response.data.result);
       this.add_folder_loading=false;
       this.dialog_add_folder=false;
       this.Set_Null_Data();
       this.Methods_Notify_Create();
     }).catch(error => {
       if (error.response.status === 422) {
         this.Methods_Validation_Notify();
         this.errors = error.response.data;
       }
       this.add_folder_loading=false;
     })
    },
    Set_Null_Data(){
      this.add_folder = {
        name:null,
        parent_id:null,
        description:null,
        password:null,
      }
    },
    Change_Folder(item){
      this.folders_parent = item.id;
      this.folders_current = item;
      this.Get_Folders();
    },
    Set_Editing_Folder(id){
      this.editing_folder = {
        id : id,
        status: !this.editing_folder.status
      }
    },

    //Media
    Create_Media() {
      this.add_media_loading = true;
      if (this.folders_current){
        this.add_media.folder_id = this.folders_current.id;
      }
      this.Module_Media_Action_Create(this.add_media).then(result => {
        

      }).catch(error => {
        this.add_media_loading=false;
        if (error.response.status === 422) {
          this.errors = error.response.data;
          return this.Methods_Validation_Notify();
        }
        this.Methods_Notify_Error_Server();
      })
    }


  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10 font-15">مدیریت رسانه ها و فایل ها</strong>
      <q-btn @click="dialog_add_folder=true" class="float-right q-mx-xs" color="blue-7" glossy icon="fas fa-folder-plus" label="پوشه جدید"></q-btn>
      <q-btn @click="dialog_add_file=true" class="float-right q-mx-xs" color="deep-orange-7" glossy icon="fas fa-file-circle-plus" label="فایل جدید"></q-btn>

      <q-dialog
          v-model="dialog_add_file"
          persistent
          position="top"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <strong class="text-red-8 font-16">ارسال فایل جدید</strong>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input :error="this.Methods_Validation_Check(errors,'title')" outlined  type="text" v-model="add_media.title" label="عنوان فایل">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'title')" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-file  outlined bottom-slots v-model="add_media.media" label="انتخاب فایل" counter>
                  <template v-slot:prepend>
                    <q-icon name="fas fa-file text-blue-8" @click.stop.prevent />
                  </template>
                  <template v-slot:append>
                    <q-icon name="fas fa-times text-red-8" @click.stop.prevent="add_media.media = null" class="cursor-pointer" />
                  </template>
                  <template v-slot:hint>
                    حجم فایل
                  </template>
                </q-file>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs q-mt-md">
                <q-input :error="this.Methods_Validation_Check(errors,'password')" outlined  type="text" v-model="add_media.password" label="کذرواژه فایل">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'password')" />
                  </template>
                </q-input>
              </div>
            </div>

          </q-card-section>
          <q-card-actions align="right">
            <q-btn glossy color="green-8" label="آپلود فایل" icon="fas fa-upload" @click="Create_Media" :loading="add_media_loading" />
            <q-btn glossy color="red-8" label="بستن" v-close-popup />

          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
          v-model="dialog_add_folder"
          persistent
          position="top"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <strong class="text-blue-10 font-16">ایجاد پوشه جدید</strong>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input dense :error="this.Methods_Validation_Check(errors,'name')" outlined  type="text" v-model="add_folder.name" label="نام پوشه">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input dense :error="this.Methods_Validation_Check(errors,'description')" outlined  type="textarea" v-model="add_folder.description" label="توضیحات">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input dense :error="this.Methods_Validation_Check(errors,'password')" outlined  type="text" v-model="add_folder.password" label="گذرواژه ">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'password')" />
                  </template>
                </q-input>
              </div>

            </div>

          </q-card-section>
          <q-card-actions align="right">
            <q-btn glossy color="blue-8" label="افرودن پوشه"  @click="Create_Folder" :loading="add_folder_loading" />
            <q-btn glossy color="dark" label="بستن" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card-section>
    <q-card-section>
      <q-separator class="q-mb-md" />
      <div class="q-mt-md q-mb-md row justify-center">
        <div class="col-xl-6 col-lg-7 col-md-9 col-sm-12 col-xs-12">
          <q-input class="font-17" outlined label="جستجو در فایل ها ..." label-color="teal-7">
            <template v-slot:append>
              <q-icon name="fas fa-search" color="blue-8"></q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">

      <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-10 col-xs-12 row">
          <div class="col-12 q-mb-sm q-ml-sm">
            <strong class="text-red-8"> نمایش به ترتیب :</strong>
          </div>
          <div class="col q-mx-xs">
            <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                outlined
                dense
                map-options
                :options="options.types"
                v-model="sort_by"
            >
            </q-select>
          </div>
          <div class="col q-mx-xs">
            <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                outlined
                dense
                map-options
                :options="options.sorts"
                v-model="sort_type"
            >
            </q-select>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>

      <global_loading_shape v-if="folders_loading" class="q-mt-lg"></global_loading_shape>
      <template v-else>
        <div class="q-py-sm">
          <!--#TODO -->
          <media_breadcrumb  :item="folders_current" ></media_breadcrumb>
          <q-separator class="q-mt-lg" />
        </div>
        <div class="row">
          <div v-for="(item,index) in folders" :key="'folder_'+index" class="col-xl-1 col-lg-1 ">

            <folder_item_grid  @dblclick="Change_Folder(item)" @contextmenu.prevent="dialog_add_folder=true" :item></folder_item_grid>

          </div>

        </div>
      </template>
    </q-card-section>

  </q-card>

</template>

<style scoped>
.edit-size{
  font-size: 30px;
}
</style>