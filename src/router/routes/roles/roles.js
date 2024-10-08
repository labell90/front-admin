import Roles_Index from "@/views/roles/Roles_Index.vue";
import Roles_Create from "@/views/roles/Roles_Create.vue";
import Roles_Edit from "@/views/roles/Roles_Edit.vue";
import Roles_Trash from "@/views/roles/Roles_Trash.vue";
import Roles_Access from "@/views/roles/Roles_Access.vue";

const route_role =[
    {
        path : "/roles",
        name : "roles_index",
        component : Roles_Index,
        meta : {
            title : 'نقش ها',
            subtitle : 'لیست همه نقش ها'
        },
    },
    {
        path : "/roles/trash",
        name : "roles_trash",
        component : Roles_Trash,
        meta : {
            title : 'نقش ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/roles/create",
        name : "roles_create",
        component : Roles_Create,
        meta : {
            title : 'نقش ها',
            subtitle : 'ایجاد نقش جدید'
        },
    },
    {
        path : "/roles/edit/:id",
        name : "roles_edit",
        component : Roles_Edit,
        meta : {
            title : 'نقش ها',
            subtitle : 'ویرایش نقش'
        },
    },
    {
        path : "/roles/access/:id",
        name : "roles_access",
        component : Roles_Access,
        meta : {
            title : 'نقش ها',
            subtitle : 'مدیریت سطوح دسترسی'
        },
    },

]
export default route_role;