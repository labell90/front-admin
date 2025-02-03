//Setting => Profile Settings
import Settings_Profile_Main from "@/views/settings/profile/Settings_Profile_Main.vue";
import Setting_Profile_Information from "@/views/settings/profile/components/Setting_Profile_Information.vue";
import Setting_Profile_Security from "@/views/settings/profile/components/Setting_Profile_Security.vue";
import Setting_Profile_Information_Edit from "@/views/settings/profile/components/Setting_Profile_Information_Edit.vue";
import Users_Profile_Tasks_Index from "@/views/users/profile/tasks/Users_Profile_Tasks_Index.vue";

const route_setting_profile =[
    {
        path : "/setting/profile",
        name: "setting_profile",
        component : Settings_Profile_Main,
        meta : {
            title : 'تنظیمات',
            subtitle : 'حساب کاربری'
        },
        children : [
            {
                path : "information",
                name: "setting_profile_information",
                component : Setting_Profile_Information,
                meta : {
                    title : 'تنظیمات',
                    subtitle : 'حساب کاربری - مشخصات فردی'
                },
            },
            {
                path : "information/edit",
                name: "setting_profile_information_edit",
                component : Setting_Profile_Information_Edit,
                meta : {
                    title : 'تنظیمات',
                    subtitle : 'حساب کاربری - ویرایش مشخصات فردی'
                },
            },
            {
                path : "security",
                name: "setting_profile_security",
                component : Setting_Profile_Security,
                meta : {
                    title : 'تنظیمات',
                    subtitle : 'حساب کاربری - امنیت'
                },
            },
        ]

    },
    {
        path : "/my/tasks",
        name: "my_task",
        component: Users_Profile_Tasks_Index,
        meta : {
            title : 'مدیریت وظایف',
            subtitle : ' وظایف من'
        },
    },
    {
        path : "/my/tasks/doing",
        name: "my_task_doing",
        component: Users_Profile_Tasks_Index,
        meta : {
            title : 'مدیریت وظایف',
            subtitle : ' وظایف در حال انجام'
        },
    },
    {
        path : "/my/tasks/done",
        name: "my_task_done",
        component: Users_Profile_Tasks_Index,
        meta : {
            title : 'مدیریت وظایف',
            subtitle : ' وظایف انجام شده'
        },
    },
    {
        path : "/my/tasks/mine",
        name: "my_task_mine",
        component: Users_Profile_Tasks_Index,
        meta : {
            title : 'مدیریت وظایف',
            subtitle : ' وظایف من'
        },
    },
    {
        path : "/my/tasks/team",
        name: "my_task_team",
        component: Users_Profile_Tasks_Index,
        meta : {
            title : 'مدیریت وظایف',
            subtitle : ' وظایف تیم'
        },
    },
    {
        path : "/my/tasks/today",
        name: "my_task_today",
        component: Users_Profile_Tasks_Index,
        meta : {
            title : 'مدیریت وظایف',
            subtitle : ' وظایف امروز'
        },
    }

]

export default route_setting_profile;