import Leads_Types_Index from "@/views/leads/types/Leads_Types_Index.vue";
import Leads_Types_Create from "@/views/leads/types/Leads_Types_Create.vue";
import Leads_Types_Edit from "@/views/leads/types/Leads_Types_Edit.vue";
import Leads_Types_Trash from "@/views/leads/types/Leads_Types_Trash.vue";


const route_leads_types=[
    {
        path : "/leads/types",
        name : "lead_types_index",
        component : Leads_Types_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست نوع سرنخ'
        },
    },
    {
        path : "/leads/types",
        name : "lead_types_trash",
        component : Leads_Types_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/types/create",
        name : "lead_types_create",
        component : Leads_Types_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد نوع سرنخ'
        },
    },
    {
        path : "/leads/types/edit/:id",
        name : "lead_types_edit",
        component : Leads_Types_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش نوع سرنخ'
        },
    }

]

export default route_leads_types;