
import Opportunity_Levels_Index from "@/views/opportunity_levels/Opportunity_Levels_Index.vue";
import Opportunity_Levels_Create from "@/views/opportunity_levels/Opportunity_Levels_Create.vue";
import Opportunity_Levels_Edit from "@/views/opportunity_levels/Opportunity_Levels_Edit.vue";
import Opportunity_Levels_Trash from "@/views/opportunity_levels/Opportunity_Levels_Trash.vue";

const route_opportunity_levels = [
    {
        path : "/opportunity/levels",
        name : "opportunity_levels_index",
        component : Opportunity_Levels_Index,
        meta : {
            title : 'مرحله فرصت فروش',
            subtitle : 'لیست مرحله فرصت فروش'
        },
    },
    {
        path : "/opportunity/levels/trash",
        name : "opportunity_levels_trash",
        component : Opportunity_Levels_Trash,
        meta : {
            title : 'مرحله فرصت فروش',
            subtitle : 'موارد حذف شده مرحله فرصت فروش'
        },
    },
    {
        path : "/opportunity/levels/create",
        name : "opportunity_levels_create",
        component : Opportunity_Levels_Create,
        meta : {
            title : 'مرحله فرصت فروش',
            subtitle : 'ایجاد مرحله فرصت فروش'
        },
    },
    {
        path : "/opportunity/levels/edit/:id",
        name : "opportunity_levels_edit",
        component : Opportunity_Levels_Edit,
        meta : {
            title : 'مرحله فرصت فروش',
            subtitle : 'ویرایش مرحله فرصت فروش'
        },
    },



]

export default route_opportunity_levels;