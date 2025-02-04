
import Stores_Create from "@/views/stores/Stores_Create.vue";
import Stores_Index from "@/views/stores/Stores_Index.vue";
import Stores_Edit from "@/views/stores/Stores_Edit.vue";
import Stores_Trash from "@/views/stores/Stores_Trash.vue";
import Stores_Inventory from "@/views/stores/components/Stores_Inventory.vue";


const route_stores = [
    {
        path : "/stores",
        name : "stores_index",
        component : Stores_Index,
        meta : {
            title : ' انبار ها',
            subtitle : 'لیست انبار ها '
        },
    },

    {
        path : "/stores/trash",
        name : "stores_trash",
        component : Stores_Trash,
        meta : {
            title : ' انبار ها',
            subtitle : 'موارد حذف شده انبار ها '
        },
    },

    {
        path : "/stores/create",
        name : "stores_create",
        component :Stores_Create,
        meta : {
            title : ' انبار ها',
            subtitle : 'ایجاد انبار'
        },
    },
    {
        path : "/stores/edit/:id",
        name : "stores_edit",
        component : Stores_Edit,
        meta : {
            title : ' انبار ها',
            subtitle : 'ویرایش انبار'
        },
    },
    {
        path : "/stores/inventory/:id",
        name : "stores_inventory",
        component : Stores_Inventory,
        meta : {
            title : ' انبار ها',
            subtitle : 'کنترل موجودی انبار'
        },
    },



]

export default route_stores;