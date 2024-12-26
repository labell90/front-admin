import Default_Stores_Create from "@/views/default_stores/Default_Stores_Create.vue";
import Default_Stores_Index from "@/views/default_stores/Default_Stores_Index.vue";
import Default_Stores_Edit from "@/views/default_stores/Default_Stores_Edit.vue";
import Default_Stores_Trash from "@/views/default_stores/Default_Stores_Trash.vue";


const route_default_stores = [
    {
        path : "/stores/defaults",
        name : "default_stores_index",
        component : Default_Stores_Index,
        meta : {
            title : 'انبار پیش فرض',
            subtitle : 'لیست انبار های پیش فرض '
        },
    },

    {
        path : "/stores/defaults/trash",
        name : "default_stores_trash",
        component : Default_Stores_Trash,
        meta : {
            title : 'انبار پیش فرض',
            subtitle : 'موارد حذف شده انبار های پیش فرض'
        },
    },

    {
        path : "/stores/defaults/create",
        name : "default_stores_create",
        component :Default_Stores_Create,
        meta : {
            title : 'انبار پیش فرض',
            subtitle : 'ایجاد انبار های پیش فرض'
        },
    },
    {
        path : "/stores/defaults/edit/:id",
        name : "default_stores_edit",
        component : Default_Stores_Edit,
        meta : {
            title : 'انبار پیش فرض',
            subtitle : 'ویرایش انبار های پیش فرض'
        },
    },



]

export default route_default_stores;