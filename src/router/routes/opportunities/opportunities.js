
import Opportunities_Index from "@/views/opportunities/Opportunities_Index.vue";
import Opportunities_Create from "@/views/opportunities/Opportunities_Create.vue";
import Opportunities_Edit from "@/views/opportunities/Opportunities_Edit.vue";
import Opportunities_Trash from "@/views/opportunities/Opportunities_Trash.vue";

const route_opportunities = [
    {
        path : "/opportunities",
        name : "opportunities_index",
        component : Opportunities_Index,
        meta : {
            title : ' فرصت فروش',
            subtitle : 'لیست فرصت فروش'
        },
    },
    {
        path : "/opportunities/trash",
        name : "opportunities_trash",
        component : Opportunities_Trash,
        meta : {
            title : ' فرصت فروش',
            subtitle : 'موارد حذف شده فرصت فروش'
        },
    },
    {
        path : "/opportunities/create",
        name : "opportunities_create",
        component : Opportunities_Create,
        meta : {
            title : ' فرصت فروش',
            subtitle : 'ایجاد فرصت فروش'
        },
    },
    {
        path : "/opportunities/edit/:id",
        name : "opportunities_edit",
        component : Opportunities_Edit,
        meta : {
            title : ' فرصت فروش',
            subtitle : 'ویرایش فرصت فروش'
        },
    },



]

export default route_opportunities;