import Leads_Utmsource_Index from "@/views/leads/utmsource/Leads_Utmsource_Index.vue";
import Leads_Utmsource_Create from "@/views/leads/utmsource/Leads_Utmsource_Create.vue";
import Leads_Utmsource_Edit from "@/views/leads/utmsource/Leads_Utmsource_Edit.vue";


const route_leads_utmsource=[
    {
        path : "/leads/utmsource",
        name : "lead_utmsource_index",
        component : Leads_Utmsource_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست Utmsource سرنخ'
        },
    },
    {
        path : "/leads/utmsource/create",
        name : "lead_utmsource_create",
        component : Leads_Utmsource_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد Utmsource سرنخ'
        },
    },
    {
        path : "/leads/utmsource/edit/:id",
        name : "lead_utmsource_edit",
        component : Leads_Utmsource_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش Utmsource سرنخ'
        },
    }

]

export default route_leads_utmsource;