import Users_Index from "@/views/users/Users_Index.vue";
import Users_Create from "@/views/users/Users_Create.vue";
import Users_Edit from "@/views/users/Users_Edit.vue";

const route_users =[
    {
        path : "/users",
        name : "users_index",
        component : Users_Index,
        meta : {
            title : 'مدیران',
            subtitle : 'لیست همه مدیران'
        },
    },
    {
        path : "/users/create",
        name : "users_create",
        component : Users_Create,
        meta : {
            title : 'مدیران',
            subtitle : 'ایجاد مدیر جدید'
        },
    },
    {
        path : "/users/edit/:id",
        name : "users_edit",
        component : Users_Edit,
        meta : {
            title : 'مدیران',
            subtitle : 'ویرایش مدیر'
        },
    },

]
export default route_users;