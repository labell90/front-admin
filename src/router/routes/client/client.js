
import Client_Create from "@/views/client/Client_Create.vue";
import Client_Index from "@/views/client/Client_Index.vue";
import Client_Edit from "@/views/client/Client_Edit.vue";
import Client_Trash from "@/views/client/Client_Trash.vue";

const route_client = [
    {
        path : "/clients",
        name : "client_index",
        component : Client_Index,
        meta : {
            title : 'نمایندگان',
            subtitle : 'لیست نمایندگان'
        },
    },
    {
        path : "/clients/trash",
        name : "client_trash",
        component : Client_Trash,
        meta : {
            title : 'نمایندگان',
            subtitle : 'موارد حذف شده نمایندگان'
        },
    },
    {
        path : "/clients/create",
        name : "client_create",
        component : Client_Create,
        meta : {
            title : 'نمایندگان',
            subtitle : 'ایجاد نمایندگان '
        },
    },
    {
        path : "/clients/edit/:id",
        name : "client_edit",
        component : Client_Edit,
        meta : {
            title : 'نمایندگان',
            subtitle : 'ویرایش نمایندگان  '
        }
    },



]

export default route_client;