
import Options_Create from "@/views/options/Options_Create.vue";
import Options_Index from "@/views/options/Options_Index.vue";
import Options_Edit from "@/views/options/Options_Edit.vue";
import Options_Trash from "@/views/options/Options_Trash.vue";


const route_options = [
    {
        path : "/options",
        name : "options_index",
        component : Options_Index,
        meta : {
            title : 'ویژگی ها ',
            subtitle : 'لیست ویژگی ها '
        },
    },

    {
        path : "/options/trash",
        name : "options_trash",
        component : Options_Trash,
        meta : {
            title : 'ویژگی ها',
            subtitle : 'موارد حذف شده ویژگی ها '
        },
    },

    {
        path : "/options/create",
        name : "options_create",
        component :Options_Create,
        meta : {
            title : 'ویژگی ها',
            subtitle : 'ایجاد ویژگی ها '
        },
    },
    {
        path : "/options/edit/:id",
        name : "options_edit",
        component : Options_Edit,
        meta : {
            title : 'ویژگی ها',
            subtitle : 'ویرایش ویژگی ها'
        },
    },



]

export default route_options;