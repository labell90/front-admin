
import Opportunity_Statuses_Index from "@/views/opportunity_statuses/Opportunity_Statuses_Index.vue";
import Opportunity_Statuses_Create from "@/views/opportunity_statuses/Opportunity_Statuses_Create.vue";
import Opportunity_Statuses_Edit from "@/views/opportunity_statuses/Opportunity_Statuses_Edit.vue";
import Opportunity_Statuses_Trash from "@/views/opportunity_statuses/Opportunity_Statuses_Trash.vue";

const route_opportunity_statuses = [
    {
        path : "/opportunity/statuses",
        name : "opportunity_levels_index",
        component : Opportunity_Statuses_Index,
        meta : {
            title : 'وضعیت فرصت فروش',
            subtitle : 'لیست وضعیت فرصت فروش'
        },
    },
    {
        path : "/opportunity/statuses/trash",
        name : "opportunity_statuses_trash",
        component : Opportunity_Statuses_Trash,
        meta : {
            title : 'وضعیت فرصت فروش',
            subtitle : 'موارد حذف شده وضعیت فرصت فروش'
        },
    },
    {
        path : "/opportunity/statuses/create",
        name : "opportunity_statuses_create",
        component : Opportunity_Statuses_Create,
        meta : {
            title : 'وضعیت فرصت فروش',
            subtitle : 'ایجاد وضعیت فرصت فروش'
        },
    },
    {
        path : "/opportunity/statuses/edit/:id",
        name : "opportunity_statuses_edit",
        component : Opportunity_Statuses_Edit,
        meta : {
            title : 'وضعیت فرصت فروش',
            subtitle : 'ویرایش وضعیت فرصت فروش'
        },
    },



]

export default route_opportunity_statuses;