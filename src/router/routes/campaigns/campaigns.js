import Campaigns_Index from "@/views/campaigns/Campaigns_Index.vue";
import Campaigns_Create from "@/views/campaigns/Campaigns_Create.vue";
import Campaigns_Edit from "@/views/campaigns/Campaigns_Edit.vue";
import Campaigns_Trash from "@/views/campaigns/Campaigns_Trash.vue";
import Campaigns_Show from "@/views/campaigns/Show/Campaigns_Show.vue";


const route_campaigns =[

    {
        path : "/campaigns",
        name : "campaigns_index",
        component : Campaigns_Index,
        meta : {
            title : 'کمپین ها',
            subtitle : 'لیست همه کمپین ها'
        },
    },
    {
        path : "/campaigns/trash",
        name : "campaigns_trash",
        component : Campaigns_Trash,
        meta : {
            title : 'کمپین ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/campaigns/create",
        name : "campaigns_create",
        component : Campaigns_Create,
        meta : {
            title : 'کمپین ها',
            subtitle : 'ایجاد کمپین جدید'
        },
    },
    {
        path : "/campaigns/edit/:id",
        name : "campaigns_edit",
        component : Campaigns_Edit,
        meta : {
            title : 'کمپین ها',
            subtitle : 'ویرایش کمپین'
        },
    },
    {
        path : "/campaigns/show/:id",
        name : "campaigns_show",
        component : Campaigns_Show,
        meta : {
            title : 'کمپین ها',
            subtitle : 'اطلاعات کامل کمپین'
        },
    },

]
export default route_campaigns;