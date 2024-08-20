import Leads_Resources_Index from "@/views/leads/resources/Leads_Resources_Index.vue";
import Leads_Resources_Create from "@/views/leads/resources/Leads_Resources_Create.vue";
import Leads_Resources_Edit from "@/views/leads/resources/Leads_Resources_Edit.vue";
import Leads_Resources_Trash from "@/views/leads/resources/Leads_Resources_Trash.vue";


const route_lead_resources = [
    {
        path : "/leads/resources",
        name : "lead_resources_index",
        component : Leads_Resources_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست منابع سرنخ'
        },
    },
    {
        path : "/leads/resources/trash",
        name : "lead_resources_trash",
        component : Leads_Resources_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/resources/create",
        name : "lead_resources_create",
        component : Leads_Resources_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد منبع سرنخ'
        },
    },
    {
        path : "/leads/resources/edit/:id",
        name : "lead_resources_edit",
        component : Leads_Resources_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش منبع سرنخ'
        },
    },



]

export default route_lead_resources;