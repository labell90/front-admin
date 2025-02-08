
import Providers_Category_Create from "@/views/providers_category/Providers_Category_Create.vue";
import Providers_Category_Index from "@/views/providers_category/Providers_Category_Index.vue";
import Providers_Category_Edit from "@/views/providers_category/Providers_Category_Edit.vue";
import Providers_Category_Trash from "@/views/providers_category/Providers_Category_Trash.vue";



const route_providers_category = [
    {
        path : "/providers/category",
        name : "providers_category_index",
        component : Providers_Category_Index,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'لیست دسته بندی تامین کنندگان '
        },
    },

    {
        path : "/providers/category/create",
        name : "providers_category_create",
        component : Providers_Category_Create,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'ایجاد دسته بندی تامین کنندگان'
        },
    },

    {
        path : "/providers/category/trash",
        name : "providers_category_trash",
        component : Providers_Category_Trash,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'موارد حذف شده دسته بندی تامین کنندگان '
        },
    },
    {
        path : "/providers/category/edit/:id",
        name : "providers_category_edit",
        component : Providers_Category_Edit,
        meta : {
            title : 'مدیریت تامین کنندگان',
            subtitle : 'ویرایش دسته بندی تامین کنندگان'
        },
    },



]

export default route_providers_category;