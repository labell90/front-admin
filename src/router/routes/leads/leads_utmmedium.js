import Leads_Utmmedium_Index from "@/views/leads/utmmedium/Leads_Utmmedium_Index.vue";
import Leads_Utmmedium_Create from "@/views/leads/utmmedium/Leads_Utmmedium_Create.vue";
import Leads_Utmmedium_Edit from "@/views/leads/utmmedium/Leads_Utmmedium_Edit.vue";
import Leads_Utmmedium_Trash from "@/views/leads/utmmedium/Leads_Utmmedium_Trash.vue";


const route_leads_utmmedium=[
    {
        path : "/leads/utmmedium",
        name : "lead_utmmedium_index",
        component : Leads_Utmmedium_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست Utmmedium سرنخ'
        },
    },
    {
        path : "/leads/utmmedium",
        name : "lead_utmmedium_trash",
        component : Leads_Utmmedium_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/utmmedium/create",
        name : "lead_utmmedium_create",
        component : Leads_Utmmedium_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد Utmmedium سرنخ'
        },
    },
    {
        path : "/leads/utmmedium/edit/:id",
        name : "lead_utmmedium_edit",
        component : Leads_Utmmedium_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش Utmmedium سرنخ'
        },
    }

]

export default route_leads_utmmedium;