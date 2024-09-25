import Campaigns_Types_Create from "@/views/compaign_types/Campaigns_Types_Create.vue";
import Campaigns_Types_Index from "@/views/compaign_types/Campaigns_Types_Index.vue";
import Campaigns_Types_Edit from "@/views/compaign_types/Campaigns_Types_Edit.vue";
import Campaigns_Types_Trash from "@/views/compaign_types/Campaigns_Types_Trash.vue";

const route_campaigns_types =[

    {
        path : "/campaign_types",
        name : "campaign_types_index",
        component : Campaigns_Types_Index,
        meta : {
            title : 'نوع کمپین ها',
            subtitle : 'لیست نوع کمپین ها'
        },
    },
    {
        path : "/campaign_types/trash",
        name : "campaign_types_trash",
        component : Campaigns_Types_Trash,
        meta : {
            title : ' نوع کمپین ها',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/campaign_types/create",
        name : "campaign_types_create",
        component : Campaigns_Types_Create,
        meta : {
            title : 'نوع کمپین ها',
            subtitle : 'ایجاد نوع کمپین جدید'
        },
    },
    {
        path : "/campaign_types/edit/:id",
        name : "campaign_types_edit",
        component : Campaigns_Types_Edit,
        meta : {
            title : 'نوع کمپین ها',
            subtitle : 'ویرایش نوع کمپین'
        },
    },

]
export default route_campaigns_types;