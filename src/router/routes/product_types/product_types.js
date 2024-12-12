
import Product_Types_Create from "@/views/product_types/Product_Types_Create.vue";
import Product_Types_Index from "@/views/product_types/Product_Types_Index.vue";
import Product_Types_Edit from "@/views/product_types/Product_Types_Edit.vue";
import Product_Types_Trash from "@/views/product_types/Product_Types_Trash.vue";


const route_product_types = [
    {
        path : "/products/types",
        name : "product_types_index",
        component : Product_Types_Index,
        meta : {
            title : ' نوع محصولات',
            subtitle : 'لیست انواع '
        },
    },

    {
        path : "/products/types/trash",
        name : "product_types_trash",
        component : Product_Types_Trash,
        meta : {
            title : 'نوع محصولات',
            subtitle : 'موارد حذف شده انواع '
        },
    },

    {
        path : "/products/types/create",
        name : "product_types_create",
        component :Product_Types_Create,
        meta : {
            title : 'نوع محصولات',
            subtitle : 'ایجاد نوع'
        },
    },
    {
        path : "/products/types/edit/:id",
        name : "product_types_edit",
        component : Product_Types_Edit,
        meta : {
            title : 'نوع محصولات',
            subtitle : 'ویرایش انواع'
        },
    },



]

export default route_product_types;