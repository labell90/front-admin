
import Customer_Create from "@/views/customer/Customer_Create.vue";
import Customer_Index from "@/views/customer/Customer_Index.vue";
import Customer_Edit from "@/views/customer/Customer_Edit.vue";
import Customer_Trash from "@/views/customer/Customer_Trash.vue";

const route_customer = [
    {
        path : "/customer",
        name : "customer_index",
        component : Customer_Index,
        meta : {
            title : 'مشتریان',
            subtitle : 'لیست مشتریان'
        },
    },
    {
        path : "/customer/trash",
        name : "customer_trash",
        component : Customer_Trash,
        meta : {
            title : 'مشتریان',
            subtitle : 'موارد حذف شده مشتریان'
        },
    },
    {
        path : "/customer/create",
        name : "customer_create",
        component : Customer_Create,
        meta : {
            title : 'مشتریان',
            subtitle : 'ایجاد مشتریان '
        },
    },
    {
        path : "/customer/edit/:id",
        name : "customer_edit",
        component : Customer_Edit,
        meta : {
            title : 'مشتریان',
            subtitle : 'ویرایش مشتریان  '
        }
    },



]

export default route_customer;