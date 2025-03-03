<script>
import {mapActions} from "vuex";
import Medias_Folders_Item_Grid from "@/views/medias/components/Medias_Folders_Item_Grid.vue";
import Medias_Breadcrumb from "@/views/medias/components/Medias_Breadcrumb.vue";
import Media_File_Manager from "@/views/medias/Media_File_Manager.vue";

export default {
  name: "Medias_Index",
  components:{
    'folder_item_grid' : Medias_Folders_Item_Grid,
    'media_breadcrumb' : Medias_Breadcrumb,
    'media_filemanger' : Media_File_Manager,
  },
  mounted() {
    // this.Get_Folders();
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
    },
    onFileSelected(fileUrl) {
      console.log('فایل انتخاب شد:', fileUrl);
      // ارسال fileUrl به سرور یا ذخیره در فرم
    }

  }
}
</script>

<template>
  <media_filemanger @selected="onFileSelected" ></media_filemanger>
</template>

<style scoped>
.edit-size{
  font-size: 30px;
}
</style>