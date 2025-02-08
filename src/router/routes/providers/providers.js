
import Providers_Create from "@/views/providers/Providers_Create.vue";
import Providers_Index from "@/views/providers/Providers_Index.vue";
import Providers_Edit from "@/views/providers/Providers_Edit.vue";
import Providers_Trash from "@/views/providers/Providers_Trash.vue";



const route_providers = [
    {
        path : "/providers",
        name : "providers_index",
        component : Providers_Index,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'لیست تامین کنندگان '
        },
    },

    {
        path : "/providers/create",
        name : "providers_create",
        component : Providers_Create,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'ایجاد تامین کنندگان'
        },
    },

    {
        path : "/providers/trash",
        name : "providers_trash",
        component : Providers_Trash,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'موارد حذف شده تامین کنندگان '
        },
    },
    {
        path : "/providers/edit/:id",
        name : "providers_edit",
        component : Providers_Edit,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'ویرایش  تامین کنندگان'
        },
    },



]

export default route_providers;