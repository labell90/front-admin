import Leads_Statuses_Index from "@/views/leads/statuses/Leads_Statuses_Index.vue";
import Leads_Statuses_Create from "@/views/leads/statuses/Leads_Statuses_Create.vue";
import Leads_Statuses_Edit from "@/views/leads/statuses/Leads_Statuses_Edit.vue";
import Leads_Statuses_Trash from "@/views/leads/statuses/Leads_Statuses_Trash.vue";


const route_lead_statuses = [
    {
        path : "/leads/statuses",
        name : "lead_statuses_index",
        component : Leads_Statuses_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست وضعیت های سرنخ'
        },
    },
    {
        path : "/leads/statuses/trash",
        name : "lead_statuses_trash",
        component : Leads_Statuses_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/statuses/create",
        name : "lead_statuses_create",
        component : Leads_Statuses_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد وضعیت سرنخ'
        },
    },
    {
        path : "/leads/statuses/edit/:id",
        name : "lead_statuses_edit",
        component : Leads_Statuses_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش وضعیت سرنخ'
        },
    },



]

export default route_lead_statuses;