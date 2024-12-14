
import Products_Create from "@/views/products/Products_Create.vue";
import Products_Index from "@/views/products/Products_Index.vue";
import Products_Edit from "@/views/products/Products_Edit.vue";
import Products_Trash from "@/views/products/Products_Trash.vue";


const route_products = [
    {
        path : "/products",
        name : "products_index",
        component : Products_Index,
        meta : {
            title : ' محصولات',
            subtitle : 'لیست محصولات '
        },
    },

    {
        path : "/products/trash",
        name : "products_trash",
        component : Products_Trash,
        meta : {
            title : ' محصولات',
            subtitle : 'موارد حذف شده محصولات '
        },
    },

    {
        path : "/products/create",
        name : "products_create",
        component :Products_Create,
        meta : {
            title : ' محصولات',
            subtitle : 'ایجاد محصول'
        },
    },
    {
        path : "/products/edit/:id",
        name : "products_edit",
        component : Products_Edit,
        meta : {
            title : ' محصولات',
            subtitle : 'ویرایش محصولات'
        },
    },



]

export default route_products;