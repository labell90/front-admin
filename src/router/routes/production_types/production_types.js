
import Production_Types_Create from "@/views/production_types/Production_Types_Create.vue";
import Production_Types_Index from "@/views/production_types/Production_Types_Index.vue";
import Production_Types_Edit from "@/views/production_types/Production_Types_Edit.vue";
import Production_Types_Trash from "@/views/production_types/Production_Types_Trash.vue";


const route_production_types = [
    {
        path : "/production/types",
        name : "production_types_index",
        component : Production_Types_Index,
        meta : {
            title : ' نوع تولید',
            subtitle : 'لیست نوع تولید '
        },
    },

    {
        path : "/production/types/trash",
        name : "production_types_trash",
        component : Production_Types_Trash,
        meta : {
            title : 'نوع تولید',
            subtitle : 'موارد حذف شده نوع تولید '
        },
    },

    {
        path : "/production/types/create",
        name : "production_types_create",
        component :Production_Types_Create,
        meta : {
            title : 'نوع تولید',
            subtitle : 'ایجاد نوع تولید'
        },
    },
    {
        path : "/production/types/edit/:id",
        name : "production_types_edit",
        component : Production_Types_Edit,
        meta : {
            title : 'نوع تولید',
            subtitle : 'ویرایش نوع تولید'
        },
    },



]

export default route_production_types;