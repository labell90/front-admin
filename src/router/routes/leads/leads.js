
import Leads_Index from "@/views/leads/leads/Leads_Index.vue";
import Leads_Create from "@/views/leads/leads/Leads_Create.vue";
import Leads_Edit from "@/views/leads/leads/Leads_Edit.vue";

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
        path : "/leads/edit/:id",
        name : "lead_edit",
        component : Leads_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش سرنخ'
        },
    }

]

export default route_leads;