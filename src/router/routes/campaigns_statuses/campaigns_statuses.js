import Campaigns_Statuses_Create from "@/views/campaign_statuses/Campaigns_Statuses_Create.vue";
import Campaigns_Statuses_Index from "@/views/campaign_statuses/Campaigns_Statuses_Index.vue";
import Campaigns_Statuses_Edit from "@/views/campaign_statuses/Campaigns_Statuses_Edit.vue";
import Campaigns_Statuses_Trash from "@/views/campaign_statuses/Campaigns_Statuses_Trash.vue";


const route_campaigns_statuses =[

    {
        path : "/campaign_statuses",
        name : "campaign_statuses_index",
        component : Campaigns_Statuses_Index,
        meta : {
            title : 'وضعیت کمپین ها',
            subtitle : 'لیست همه وضعیت کمپین ها'
        },
    },
    {
        path : "/campaign_statuses/trash",
        name : "campaign_statuses_trash",
        component : Campaigns_Statuses_Trash,
        meta : {
            title : ' وضعیت کمپین ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/campaign_statuses/create",
        name : "campaign_statuses_create",
        component : Campaigns_Statuses_Create,
        meta : {
            title : 'وضعیت کمپین ها',
            subtitle : 'ایجاد وضعیت کمپین جدید'
        },
    },
    {
        path : "/campaign_statuses/edit/:id",
        name : "campaign_statuses_edit",
        component : Campaigns_Statuses_Edit,
        meta : {
            title : 'وضعیت کمپین ها',
            subtitle : 'ویرایش وضعیت کمپین'
        },
    },

]
export default route_campaigns_statuses;