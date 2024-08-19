import Lead_Industries_Index from "@/views/leads/industries/Lead_Industries_Index.vue";
import Lead_Industries_Create from "@/views/leads/industries/Lead_Industries_Create.vue";
import Lead_Industries_Edit from "@/views/leads/industries/Lead_Industries_Edit.vue";
import Lead_Industries_Trash from "@/views/leads/industries/Lead_Industries_Trash.vue";

const route_leads_industries=[
    {
        path : "/leads/industries",
        name : "lead_industries_index",
        component : Lead_Industries_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست صنایع سرنخ'
        },
    },
    {
        path : "/leads/industries",
        name : "lead_industries_trash",
        component : Lead_Industries_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/industries/create",
        name : "lead_industries_create",
        component : Lead_Industries_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد صنایع سرنخ'
        },
    },
    {
        path : "/leads/industries/edit/:id",
        name : "lead_industries_edit",
        component : Lead_Industries_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش صنایع سرنخ'
        },
    }

]

export default route_leads_industries;