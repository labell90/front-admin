//Setting => Profile Settings
import Settings_Profile_Main from "@/views/settings/profile/Settings_Profile_Main.vue";

const route_setting_profile =[
    {
        path : "/setting/profile",
        name: "setting_profile",
        component : Settings_Profile_Main,
        meta : {
            title : 'تنظیمات',
            subtitle : 'حساب کاربری'
        },

    }

]

export default route_setting_profile;