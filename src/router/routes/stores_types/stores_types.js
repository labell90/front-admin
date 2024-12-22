
import Stores_Types_Create from "@/views/stores_types/Stores_Types_Create.vue";
import Stores_Types_Index from "@/views/stores_types/Stores_Types_Index.vue";
import Stores_Types_Edit from "@/views/stores_types/Stores_Types_Edit.vue";
import Stores_Types_Trash from "@/views/stores_types/Stores_Types_Trash.vue";

const route_stores_types = [
    {
        path : "/stores/types",
        name : "stores_types_index",
        component : Stores_Types_Index,
        meta : {
            title : 'نوع انبار ها',
            subtitle : 'لیست نوع انبار '
        },
    },
    {
        path : "/stores/types/trash",
        name : "stores_types_trash",
        component : Stores_Types_Trash,
        meta : {
            title : 'نوع انبار ها',
            subtitle : 'موارد حذف شده نوع انبار '
        },
    },
    {
        path : "/stores/types/create",
        name : "stores_types_create",
        component : Stores_Types_Create,
        meta : {
            title : 'نوع انبار ها',
            subtitle : 'ایجاد نوع انبار'
        },
    },
    {
        path : "/stores/types/edit/:id",
        name : "stores_types_edit",
        component : Stores_Types_Edit,
        meta : {
            title : 'نوع انبار ها',
            subtitle : 'ویرایش  نوع انبار'
        },
    },



]

export default route_stores_types;