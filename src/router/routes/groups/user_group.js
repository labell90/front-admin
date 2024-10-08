
import Groups_Index from "@/views/groups/Groups_Index.vue";
import Groups_Create from "@/views/groups/Groups_Create.vue";
import Groups_Edit from "@/views/groups/Groups_Edit.vue";
import Groups_Trash from "@/views/groups/Groups_Trash.vue";

const route_groups = [
    {
        path : "/groups",
        name : "groups_index",
        component : Groups_Index,
        meta : {
            title : 'گروه بندی کاربران',
            subtitle : 'لیست گروه کاربران'
        },
    },
    {
        path : "/groups/trash",
        name : "groups_trash",
        component : Groups_Trash,
        meta : {
            title : 'گروه بندی کاربران',
            subtitle : 'موارد حذف شده'
        },
    },
    {
        path : "/groups/create",
        name : "groups_create",
        component : Groups_Create,
        meta : {
            title : 'گروه بندی کاربران',
            subtitle : 'ایجاد گروه کاربران'
        },
    },
    {
        path : "/groups/edit/:id",
        name : "groups_edit",
        component : Groups_Edit,
        meta : {
            title : 'گروه بندی کاربران',
            subtitle : 'ویرایش گروه کاربران'
        },
    },



]

export default route_groups;