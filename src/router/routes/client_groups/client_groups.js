import Users_Index from "@/views/users/Users_Index.vue";
import Client_Groups_Create from "@/views/client_groups/Client_Groups_Create.vue";
import Client_Groups_Index from "@/views/client_groups/Client_Groups_Index.vue";
import Client_Groups_Edit from "@/views/client_groups/Client_Groups_Edit.vue";
import Client_Groups_Trash from "@/views/client_groups/Client_Groups_Trash.vue";

const route_client_groups = [
    {
        path : "/clients/groups",
        name : "client_groups_index",
        component : Client_Groups_Index,
        meta : {
            title : 'نمایندگان',
            subtitle : 'لیست گروه بندی نمایندگان'
        },
    },
    {
        path : "/clients/groups/trash",
        name : "client_groups_trash",
        component : Client_Groups_Trash,
        meta : {
            title : 'نمایندگان',
            subtitle : 'موارد حذف شده گروه بندی'
        },
    },
    {
        path : "/clients/groups/create",
        name : "client_groups_create",
        component : Client_Groups_Create,
        meta : {
            title : 'نمایندگان',
            subtitle : 'ایجاد گروه بندی'
        },
    },
    {
        path : "/clients/groups/edit/:id",
        name : "client_groups_edit",
        component : Client_Groups_Edit,
        meta : {
            title : 'نمایندگان',
            subtitle : 'ویرایش  گروه بندی'
        },
    },



]

export default route_client_groups;