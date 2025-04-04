
import Leads_Index from "@/views/leads/leads/Leads_Index.vue";
import Leads_Create from "@/views/leads/leads/Leads_Create.vue";
import Leads_Edit from "@/views/leads/leads/Leads_Edit.vue";
import Leads_Profile_Index from "@/views/leads/leads/profile/Leads_Profile_Index.vue";
import Lead_Fields from "@/views/leads/leads/Lead_Fields.vue";
import Leads_Trash from "@/views/leads/leads/Leads_Trash.vue";
import Leads_Info from "@/views/leads/leads/Leads_Info.vue";

const route_leads=[
    {
        path : "/leads",
        name : "lead_index",
        component : Leads_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست نوع سرنخ'
        },
    },
    {
        path : "/leads/create",
        name : "lead_create",
        component : Leads_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد سرنخ'
        },
    },
    {
        path : "/leads/fields",
        name : "lead_fields",
        component : Lead_Fields,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'فیلد های اضافه '
        },
    },
    {
        path : "/leads/trash",
        name : "lead_trash",
        component : Leads_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده سرنخ'
        },
    },
    {
        path : "/leads/edit/:id",
        name : "lead_edit",
        component : Leads_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش سرنخ'
        },
    },
    {
        path : "/leads/profile/:id",
        name : "lead_profile",
        component : Leads_Profile_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'پروفایل سرنخ'
        },
    },
    {
        path : "/leads/profile/:id/notes",
        name : "lead_profile_notes",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'یادداشت ها'
        },
    },
    {
        path : "/leads/profile/:id/histories",
        name : "lead_profile_histories",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'تاریخچه'
        },
    },
    {
        path : "/leads/profile/:id/texts",
        name : "lead_profile_texts",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'پیامک ها'
        },
    },
    {
        path : "/leads/profile/:id/documents",
        name : "lead_profile_documents",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'اسناد و مدارک'
        },
    },
    {
        path: "/leads/info/:id",
        name: "lead_info",
        component: Leads_Info,
        meta: {
            title: 'تنظیمات سرنخ ها',
            subtitle: 'اطلاعات کامل سرنخ'
        },
    },

    {
        path : "/leads/profile/:id/campaigns",
        name : "lead_profile_campaigns",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'کمپین ها'
        },
    },

    {
        path : "/leads/profile/:id/emails",
        name : "lead_profile_emails",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'ایمیل ها'
        },
    },
    {
        path : "/leads/profile/:id/contacts",
        name : "lead_profile_contacts",
        component : Leads_Profile_Index,
        meta : {
            title : 'پروفایل سرنخ',
            subtitle : 'مخاطبین'
        },
    },


]

export default route_leads;