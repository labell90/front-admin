
import Units_Create from "@/views/units/Units_Create.vue";
import Units_Index from "@/views/units/Units_Index.vue";
import Units_Edit from "@/views/units/Units_Edit.vue";
import Units_Trash from "@/views/units/Units_Trash.vue";

const route_units = [
    {
        path : "/units",
        name : "units_index",
        component : Units_Index,
        meta : {
            title : 'یکاهای اندازی گیری',
            subtitle : 'لیست یکا ها '
        },
    },
    {
        path : "/units/trash",
        name : "units_trash",
        component : Units_Trash,
        meta : {
            title : 'یکاهای اندازی گیری',
            subtitle : 'موارد حذف شده یکا ها'
        },
    },
    {
        path : "/units/create",
        name : "units_create",
        component : Units_Create,
        meta : {
            title : 'یکاهای اندازی گیری',
            subtitle : 'ایجاد یکا ها'
        },
    },
    {
        path : "/units/edit/:id",
        name : "units_edit",
        component : Units_Edit,
        meta : {
            title : 'یکاهای اندازی گیری',
            subtitle : 'ویرایش  یکا ها'
        },
    },



]

export default route_units;