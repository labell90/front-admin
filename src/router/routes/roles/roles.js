import Roles_Index from "@/views/roles/Roles_Index.vue";
import Roles_Create from "@/views/roles/Roles_Create.vue";
import Roles_Edit from "@/views/roles/Roles_Edit.vue";

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

]
export default route_role;