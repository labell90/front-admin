
import Product_Groups_Create from "@/views/product_groups/Product_Groups_Create.vue";
import Product_Groups_Index from "@/views/product_groups/Product_Groups_Index.vue";
import Product_Groups_Edit from "@/views/product_groups/Product_Groups_Edit.vue";
import Product_Groups_Trash from "@/views/product_groups/Product_Groups_Trash.vue";


const route_product_groups = [
    {
        path : "/products/groups",
        name : "product_groups_index",
        component : Product_Groups_Index,
        meta : {
            title : 'گروه بندی محصولات',
            subtitle : 'لیست گروه بندی '
        },
    },

    {
        path : "/products/groups/trash",
        name : "product_groups_trash",
        component : Product_Groups_Trash,
        meta : {
            title : 'گروه بندی محصولات',
            subtitle : 'موارد حذف شده گروه بندی '
        },
    },

    {
        path : "/products/groups/create",
        name : "product_groups_create",
        component :Product_Groups_Create,
        meta : {
            title : 'گروه بندی محصولات',
            subtitle : 'ایجاد گروه بندی'
        },
    },
    {
        path : "/products/groups/edit/:id",
        name : "product_groups_edit",
        component : Product_Groups_Edit,
        meta : {
            title : 'گروه بندی محصولات',
            subtitle : 'ویرایش  گروه بندی'
        },
    },



]

export default route_product_groups;