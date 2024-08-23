import Users_Index from "@/views/users/Users_Index.vue";
import Users_Create from "@/views/users/Users_Create.vue";
import Users_Edit from "@/views/users/Users_Edit.vue";
import Users_Access from "@/views/users/Users_Access.vue";
import Users_Trash from "@/views/users/Users_Trash.vue";
import Users_Profile from "@/views/users/profile/Users_Profile_Index.vue";

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
        path : "/users/profile/:id",
        name : "users_profile",
        component : Users_Profile,
        meta : {
            title : 'مدیران',
            subtitle : 'پروفایل مدیران'
        },
    },
    {
        path : "/users/trash",
        name : "users_trash",
        component : Users_Trash,
        meta : {
            title : 'مدیران',
            subtitle : 'موارد حذف شده'
        },
    },
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
    {
        path : "/users/access/:id",
        name : "users_access",
        component : Users_Access,
        meta : {
            title : 'مدیران',
            subtitle : 'مدیریت سطوح دسترسی'
        },
    },

]
export default route_users;