//Setting => Profile Settings
import Settings_Profile_Main from "@/views/settings/profile/Settings_Profile_Main.vue";
import Setting_Profile_Information from "@/views/settings/profile/components/Setting_Profile_Information.vue";
import Setting_Profile_Security from "@/views/settings/profile/components/Setting_Profile_Security.vue";
import Setting_Profile_Information_Edit from "@/views/settings/profile/components/Setting_Profile_Information_Edit.vue";

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
    }

]

export default route_setting_profile;