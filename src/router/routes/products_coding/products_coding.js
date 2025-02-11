
import Products_Coding_Create from "@/views/products_coding/Products_Coding_Create.vue";
import Products_Coding_Index from "@/views/products_coding/Products_Coding_Index.vue";
import Products_Coding_Edit from "@/views/products_coding/Products_Coding_Edit.vue";
import Products_Coding_Trash from "@/views/products_coding/Products_Coding_Trash.vue";


const route_products_coding = [
    {
        path : "/products/coding",
        name : "products_coding_index",
        component : Products_Coding_Index,
        meta : {
            title : 'کد گذاری محصولات',
            subtitle : 'لیست کد گذاری محصولات '
        },
    },

    {
        path : "/products/coding/trash",
        name : "products_coding_trash",
        component : Products_Coding_Trash,
        meta : {
            title : 'کد گذاری محصولات',
            subtitle : 'موارد حذف شده کد گذاری محصولات '
        },
    },

    {
        path : "/products/coding/create",
        name : "products_coding_create",
        component :Products_Coding_Create,
        meta : {
            title : 'کد گذاری محصولات',
            subtitle : 'ایجاد کد گذاری محصول'
        },
    },
    {
        path : "/products/coding/edit/:id",
        name : "products_coding_edit",
        component : Products_Coding_Edit,
        meta : {
            title : 'کد گذاری محصولات',
            subtitle : 'ویرایش کد گذاری محصولات'
        },
    },



]

export default route_products_coding;