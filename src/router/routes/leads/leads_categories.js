import Users_Index from "@/views/users/Users_Index.vue";
import Leads_Categories_Index from "@/views/leads/categories/Leads_Categories_Index.vue";
import Leads_Categories_Create from "@/views/leads/categories/Leads_Categories_Create.vue";
import Leads_Categories_Edit from "@/views/leads/categories/Leads_Categories_Edit.vue";
import Leads_Categories_Trash from "@/views/leads/categories/Leads_Categories_Trash.vue";

const route_lead_categories = [
    {
        path : "/leads/categories",
        name : "lead_categories_index",
        component : Leads_Categories_Index,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'لیست دسته بندی های سرنخ'
        },
    },
    {
        path : "/leads/categories/trash",
        name : "lead_categories_trash",
        component : Leads_Categories_Trash,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/leads/categories/create",
        name : "lead_categories_create",
        component : Leads_Categories_Create,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ایجاد دسته بندی سرنخ'
        },
    },
    {
        path : "/leads/categories/edit/:id",
        name : "lead_categories_edit",
        component : Leads_Categories_Edit,
        meta : {
            title : 'تنظیمات سرنخ ها',
            subtitle : 'ویرایش دسته بندی سرنخ'
        },
    },



]

export default route_lead_categories;