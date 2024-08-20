
import Leads_Advsource_Index from "@/views/leads/advsource/Leads_Advsource_Index.vue";
import Leads_Advsource_Create from "@/views/leads/advsource/Leads_Advsource_Create.vue";
import Leads_Advsource_Edit from "@/views/leads/advsource/Leads_Advsource_Edit.vue";
import Leads_Advsource_Trash from "@/views/leads/advsource/Leads_Advsource_Trash.vue";

const route_lead_advsource = [
    {
        path : "/leads/advsource",
        name : "lead_advsource_index",
        component : Leads_Advsource_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست منبع تبلیغ سرنخ'
        },
    },
    {
        path : "/leads/advsource/trash",
        name : "lead_advsource_trash",
        component : Leads_Advsource_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/advsource/create",
        name : "lead_advsource_create",
        component : Leads_Advsource_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد منبع تبلیغ سرنخ'
        },
    },
    {
        path : "/leads/advsource/edit/:id",
        name : "lead_advsource_edit",
        component : Leads_Advsource_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش منبع تبلیغ سرنخ'
        },
    },



]

export default route_lead_advsource;